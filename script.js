/**
 * Represents a single book object.
 */
class Book {
  /**
   * @param {string} title - the book's title
   * @param {string} author - the book's author
   * @param {number} pages - the number of pages in the book
   * @param {boolean} hasBeenRead - the read status of the book
   */
  constructor(title, author, pages, hasBeenRead) {
    // Generate a unique identifier using crypto.randomUUID()
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
  }

  /**
   * Responsible for updating the hasBeenRead status between true and false
   * @returns {void}
   */
  toggleRead() {
    this.hasBeenRead = this.hasBeenRead ? false : true;
  }
}

/**
 * Store book objects to be manipulated in memory.
 * @type {Book[]}
 */
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

/**
 * Responsible for validating the new book details and creating a new Book object and pushes it to the booksCollection array.
 * @param {string} title - the title for the new book
 * @param {string} author - the author for the new book
 * @param {number} pages - the number of pages for the new book
 * @param {boolean} [hasBeenRead=false] - the read status for the new book
 * @returns {void}
 * @throws {Error} - validation errors thrown for invalid parameters
 */
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

/**
 * Responsible for displaying books in the container by creating book cards for each book.
 * @param {Book[]} books - the collection of books to display
 * @returns {void}
 */
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

/**
 * Toggles the read status of the book with matching id.
 * @param {string} bookId - the id of the book to update
 * @returns {void}
 * @throws {Error} - thrown when no book matches the provided id
 */
function updateReadStatus(bookId) {
  let bookToUpdate = booksCollection.find((book) => book.id === bookId);

  if (!bookToUpdate) {
    throw new Error("Book not found");
  }

  bookToUpdate.toggleRead();

  displayBooks(booksCollection);
}

/**
 * Filters bookCollection removing book to be deleted.
 * @param {string} bookId - the id of the book to delete
 * @returns {void}
 * @throws {Error} - thrown when no book matches the provided id
 */
function deleteBook(bookId) {
  // Confirm the book exists before attempting to delete it.
  const bookExists = booksCollection.some((book) => book.id === bookId);

  if (!bookExists) {
    throw new Error("Book not found");
  }

  // Updates bookCollection by filtering out the book that matches the id of the book to be deleted.
  booksCollection = booksCollection.filter((book) => book.id !== bookId);

  displayBooks(booksCollection);
}

// Display initial books
displayBooks(booksCollection);

/**
 * The modal element for adding a new book.
 * @type {HTMLDialogElement}
 */
const newBookModal = document.querySelector("#add-book-modal");

/**
 * The form element for adding a new book.
 * @type {HTMLFormElement}
 */
const newBookForm = document.querySelector("#add-book-form");

/**
 * The feedback field element for displaying form messages.
 * @type {HTMLElement}
 */
const formFeedbackField = document.querySelector("#form-feedback");

/**
 * The submit button element for the new book form.
 * @type {HTMLButtonElement}
 */
const submitButton = document.querySelector("#new-book-submit-button");

/**
 * The timeout id for closing the modal after a delay.
 * @type {number|null}
 */
let modalTimeoutId = null;

// Handles new book form submission, adding a new book to the collection
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
    submitButton.disabled = true;
    displayBooks(booksCollection);
    formFeedbackField.textContent = "Book added successfully! Closing form.";

    // Close and reset modal with delay to allow the user time to read the success message.
    modalTimeoutId = setTimeout(() => {
      newBookModal.close();
    }, 2000);
  } catch (error) {
    // Update modal with message to alert user of error.
    formFeedbackField.textContent = `Error adding new book: ${error.message}`;
  }
});

// Reset form when modal is closed.
newBookModal.addEventListener("close", (e) => {
  if (modalTimeoutId) {
    clearTimeout(modalTimeoutId);
    modalTimeoutId = null;
  }
  formFeedbackField.textContent = "";
  newBookForm.reset();
  submitButton.disabled = false;
});

/**
 * The container element for displaying books.
 * @type {HTMLElement}
 */
const bookContainer = document.querySelector(".books-container");

// Use event delegation on the container, handling clicks on all book cards efficiently without attaching separate listeners to each one
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
