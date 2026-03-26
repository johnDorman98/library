const bookCollection = [];

// Constructor to create new books.
function Book(title, author, pages, hasBeenRead) {
  // Using UUID to set a unique identifier for each book.
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasBeenRead = hasBeenRead;
}

function addBook(title, author, pages, hasBeenRead = false) {
  // Ensure all required fields are present
  if (!title || !author) {
    throw new Error("Invalid title or author");
  }

  if (pages == null) {
    throw new Error("Invalid value provided for pages");
  }

  // Standardize the page count into a whole number before validation
  pages = parseInt(pages);

  // Check for realistic page values
  if (!Number.isInteger(pages) || pages <= 0) {
    throw new Error("Please enter a positive whole number for pages.");
  }

  // Ensure 'hasBeenRead' is strictly a boolean to avoid logic errors in the UI
  if (typeof hasBeenRead !== 'boolean') {
    throw new Error("Read status must be true or false.");
  }

  const book = new Book(title, author, pages, hasBeenRead);
  bookCollection.push(book);
}

function displayBooks(books) {
  const bookContainer = document.querySelector(".books-container");

  // Reset book container to prevent duplicate content
  bookContainer.textContent = "";

  // Create and add a new element for each book in 'books' parameter.
  books.forEach((book) => {
    // Create element to store book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Store book details to be created
    const bookDetails = [
      { tag: 'h3', text: `Title: ${book.title}` },
      { tag: 'p', text: `Author: ${book.author}` },
      { tag: 'p', text: `Pages: ${book.pages}` },
      { tag: 'p', text: book.hasBeenRead ? "Status: Read" : "Status: Not read yet" }
    ];

    // Create elements based on the tag and text within bookDetails
    bookDetails.forEach(detail => {
      const element = document.createElement(detail.tag);
      element.textContent = detail.text;
      bookCard.appendChild(element);
    });

    // Append created card to book container
    bookContainer.appendChild(bookCard);
  });
}

// Add test book to bookCollection
const testBook = new Book("Johns' Book", "John", 117);
bookCollection.push(testBook);

displayBooks(bookCollection);
