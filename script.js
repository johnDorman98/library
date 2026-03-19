// In memory to store book objects.
const bookCollection = []

// Constructor to create new books.
function Book(title, author, pages, hasBeenRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.hasBeenRead = hasBeenRead
}