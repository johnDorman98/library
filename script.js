const bookCollection = []

// Constructor to create new books.
function Book(title, author, pages, hasBeenRead) {
  // Using UUID to set a unique identifier for each book.
  this.id = crypto.randomUUID()
  this.title = title
  this.author = author
  this.pages = pages
  this.hasBeenRead = hasBeenRead
}

function addBook(title, author, pages, hasBeenRead = false) {
  if (!title || !author ) {
    throw new Error("Invalid title or author");
  }

  if (pages == null) {
    throw new Error("Invalid value provided for pages");
  }

  // Attempt to cast pages to an integer.
  pages = parseInt(pages)

  // Ensure 'pages' is a valid, positive whole number
  if (!Number.isInteger(pages)) {
    throw new Error("Please enter a whole number for pages.");
  }

  if (pages <= 0) {
    throw new Error("Please ensure that a value of 0 or greater is provided for pages.");
  }

  if (hasBeenRead == null) {
    throw new Error("Please provide a boolean of true or false for hasBeenRead");
  }

  // Create book object based on parameters.
  const book = new Book(title, author, pages, hasBeenRead)

  // Add book to collection of book.
  bookCollection.push(book)
}
