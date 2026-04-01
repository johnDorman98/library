// Single source of truth for current book objects
let booksCollection = [];

// Add 4 example books to the collection
try {
    addBook("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
    addBook("To Kill a Mockingbird", "Harper Lee", 281, true);
    addBook("1984", "George Orwell", 328, false);
    addBook("Pride and Prejudice", "Jane Austen", 432, false);
} catch (error) {
    console.error("Error adding example books:", error.message);
}

// Constructor to create new books with unique identifiers
function Book(title, author, pages, hasBeenRead) {
  // Generate a unique identifier using crypto.randomUUID()
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasBeenRead = hasBeenRead;
}

Book.prototype.toggleRead = function () {
  this.hasBeenRead = this.hasBeenRead ? false : true;
};

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
    // The bookId data attribute will be used when a book is deleted.
    deleteButton.dataset.bookId = book.id;
    deleteButton.dataset.action = "delete";
    bookCard.appendChild(deleteButton);

    const markAsReadButton = document.createElement("button");

    // Display button text based on current read status to indicate the action to be performed.
    markAsReadButton.innerText = book.hasBeenRead ? "Mark Unread" : "Mark Read";
    markAsReadButton.type = "button";
    // Set data attribute to associate book with a specific book id.
    // The bookId data attribute will be used when toggling a book's read status.
    markAsReadButton.dataset.bookId = book.id;
    markAsReadButton.dataset.action = "toggle-read";
    bookCard.appendChild(markAsReadButton);

    bookContainer.appendChild(bookCard);
  });
}

// Marks book with matching id as read.
function updateReadStatus(bookId) {
  let bookToUpdate = booksCollection.find((book) => book.id === bookId);

  bookToUpdate.toggleRead();

  displayBooks(booksCollection);
}

// Filters bookCollection removing book to be deleted.
function deleteBook(bookId) {
  // Updates bookCollection by filtering out the book that matches the id of the book to be deleted.
  booksCollection = booksCollection.filter((book) => book.id !== bookId);

  displayBooks(booksCollection);
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
  const selectedBookId = e.target.dataset.bookId;
  const buttonAction = e.target.dataset.action;

  if (buttonAction === "delete") {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete the book?",
    );

    if (confirmDeletion) {
      deleteBook(selectedBookId);
    }
  } else if (buttonAction === "toggle-read") {
    updateReadStatus(selectedBookId);
  }
});