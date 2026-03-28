const bookCollection = [];

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
  // Validate required fields
  if (!title || !author) {
    throw new Error("Invalid title or author");
  }

  // Validate page count
  if (pages == null) {
    throw new Error("Invalid value provided for pages");
  }

  // Convert to integer and validate
  pages = parseInt(pages);
  if (!Number.isInteger(pages) || pages <= 0) {
    throw new Error("Please enter a positive whole number for pages.");
  }

  // Ensure read status is boolean
  if (typeof hasBeenRead !== "boolean") {
    throw new Error("Read status must be true or false.");
  }

  // Create and add book to collection
  const book = new Book(title, author, pages, hasBeenRead);
  bookCollection.push(book);
}

// Display books in the container
function displayBooks(books) {
  const bookContainer = document.querySelector(".books-container");
  // Clear existing content
  bookContainer.textContent = "";

  // Create book cards for each book
  books.forEach((book) => {
    // Create book card container
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Create book details
    const bookDetails = [
      { tag: "h3", text: `Title: ${book.title}` },
      { tag: "p", text: `Author: ${book.author}` },
      { tag: "p", text: `Pages: ${book.pages}` },
      {
        tag: "p",
        text: book.hasBeenRead ? "Status: Read" : "Status: Not read yet",
      },
    ];

    // Add details to card
    bookDetails.forEach((detail) => {
      const element = document.createElement(detail.tag);
      element.textContent = detail.text;
      bookCard.appendChild(element);
    });

    // Add card to container
    bookContainer.appendChild(bookCard);
  });
}

// Add test book to collection
const testBook = new Book("Johns' Book", "John", 117);
bookCollection.push(testBook);

// Display initial books
displayBooks(bookCollection);

// Handle form submission
const newBookModal = document.querySelector("#add-book-modal");
const newBookForm = document.querySelector("#add-book-form");
const formFeedbackField = document.querySelector("#form-feedback");

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTitle = e.target.elements["new-book-title"].value;
  const newAuthor = e.target.elements["new-book-author"].value;
  const newPages = e.target.elements["new-book-pages"].value;
  const newReadStatus = e.target.elements["new-book-read-status"].checked;

  try {
    addBook(newTitle, newAuthor, newPages, newReadStatus);
    displayBooks(bookCollection);
    formFeedbackField.textContent = "Book added successfully! Closing form.";
    
    setTimeout(() => {
      newBookModal.close();
      formFeedbackField.textContent = "";
      e.target.reset();
    }, 2000);
  } catch (error) {
    formFeedbackField.textContent = `Error adding new book: ${error.message}`;
  }
});
