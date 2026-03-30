// Single source of truth for current book objects
let booksCollection = [];

// Constructor to create new books with unique identifiers
function Book(title, author, pages, hasBeenRead) {
  // Generate a unique identifier using crypto.randomUUID()
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasBeenRead = hasBeenRead;
}

// Add new book to collection with validation
function addBook(title, author, pages, hasBeenRead = false) {
  // Ensuring that only valid data is added to the collection.
  if (!title || !author) {
    throw new Error("Invalid title or author");
  }

  if (pages == null) {
    throw new Error("Invalid value provided for pages");
  }

  pages = parseInt(pages);
  if (!Number.isInteger(pages) || pages <= 0) {
    throw new Error("Please enter a positive whole number for pages.");
  }

  if (typeof hasBeenRead !== "boolean") {
    throw new Error("Read status must be true or false.");
  }

  // Create and add book to collection
  const book = new Book(title, author, pages, hasBeenRead);
  booksCollection.push(book);
}

// Display books in the container
function displayBooks(books) {
  const bookContainer = document.querySelector(".books-container");
  // Prevent duplicate books being displayed
  bookContainer.textContent = "";

  // Create book cards for each book
  books.forEach((book) => {
    // Create book card with its inner elements
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Storing tag and text to create each element without duplication.
    const bookDetails = [
      { tag: "h3", text: `Title: ${book.title}` },
      { tag: "p", text: `Author: ${book.author}` },
      { tag: "p", text: `Pages: ${book.pages}` },
      {
        tag: "p",
        text: book.hasBeenRead ? "Status: Read" : "Status: Not read yet",
      },
    ];

    // Use tag and text to create book card elements.
    bookDetails.forEach((detail) => {
      const element = document.createElement(detail.tag);
      element.textContent = detail.text;
      bookCard.appendChild(element);
    });

    const deleteButton = document.createElement("button");

    deleteButton.innerText = "Delete";
    deleteButton.type = "button";
    // set data attribute to associate book with a specific book id.
    // The bookId data attribute will be used when a book is deleted or edited.
    deleteButton.dataset.bookId = book.id;
    bookCard.appendChild(deleteButton);

    bookContainer.appendChild(bookCard);
  });
}

// Filters bookCollection removing book to be deleted.
function deleteBook(bookId) {
  // Updates bookCollection by filtering out the book that matches the id of the book to be deleted.
  booksCollection = booksCollection.filter(book => book.id !== bookId)

  displayBooks(booksCollection)
}

// Display initial books
displayBooks(booksCollection);

// Handle form submission
const newBookModal = document.querySelector("#add-book-modal");
const newBookForm = document.querySelector("#add-book-form");
const formFeedbackField = document.querySelector("#form-feedback");

newBookForm.addEventListener("submit", (e) => {
  // Prevent the default behavior of refreshing a page when the form is submitted.
  e.preventDefault();
  const newTitle = e.target.elements["new-book-title"].value;
  const newAuthor = e.target.elements["new-book-author"].value;
  const newPages = e.target.elements["new-book-pages"].value;
  const newReadStatus = e.target.elements["new-book-read-status"].checked;

  try {
    // Update bookCollection and display upon valid book values.
    addBook(newTitle, newAuthor, newPages, newReadStatus);
    displayBooks(booksCollection);
    formFeedbackField.textContent = "Book added successfully! Closing form.";

    // Close and reset modal with delay to allow the user time to read the success message.
    setTimeout(() => {
      newBookModal.close();
      formFeedbackField.textContent = "";
      e.target.reset();
    }, 2000);
  } catch (error) {
    // Update modal with message to alert user of error.
    formFeedbackField.textContent = `Error adding new book: ${error.message}`;
  }
});

const bookContainer = document.querySelector(".books-container");

// Listening for click on container as a whole for reduced load of listening to an event on each card
bookContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Delete") {
    const confirmDeletion = window.confirm("Are you sure you want to delete the book?");

    if (confirmDeletion) {
      const selectedBookId = e.target.dataset.bookId

      deleteBook(selectedBookId)
    }
  }
})