# John's Library

## Description

A modern, client-side library management application that allows users to track their book collection. Built with vanilla HTML, CSS, and JavaScript, this project demonstrates modern web development practices including the use of the HTML `<dialog>` element, CSS custom properties for theming, and event delegation for efficient DOM interaction.

The application features a dark theme with neon accents, form validation with visual feedback, and a clean card-based layout for displaying books.

## Features

- **Add Books**: A modal form with improved styling allows users to add new books with title, author, page count, and read status
- **Form Validation**: Real-time validation feedback using `:user-valid` and `:user-invalid` CSS pseudo-classes with visual indicators (X marker for invalid fields)
- **Book Display**: Books are displayed in a responsive grid layout with card components showing title, author, pages, and read status
- **Toggle Read Status**: Update a book's read/unread status with the "Mark Read" / "Mark Unread" button
- **Delete Books**: Remove books from the collection with a confirmation dialog
- **Unique Identifiers**: Each book is assigned a unique ID using `crypto.randomUUID()`
- **Dark Theme**: Modern dark theme with cyan and magenta neon accents using CSS custom properties
- **Responsive Design**: Grid-based layout that adapts to different screen sizes using `auto-fit` and `minmax()`
- **Modern HTML Dialog**: Uses the native `<dialog>` element with `command` and `commandfor` attributes for modal functionality
- **Example Books**: Pre-populated with four classic books to demonstrate functionality

## Live Demo

Access the live deployed webpage via GitHub Pages:

```
https://johndorman98.github.io/library
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd library
   ```

2. Open `index.html` in your web browser:
   - Double-click the `index.html` file, or
   - Use a local development server (recommended):

     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js http-server (if installed)
     npx http-server
     ```

     Then navigate to `http://localhost:8000`

## Usage

1. **Adding a Book**:
   - Click the "Add Book" button
   - Fill in the book details (title, author, pages, read status)
   - Click "Add" to add the book to your collection
   - Form validation will provide immediate feedback for invalid inputs

2. **Managing Books**:
   - Click "Mark Read" / "Mark Unread" to toggle a book's read status
   - Click "Delete" to remove a book (confirmation required)

3. **Data Persistence**:
   - Note: This is a client-side only application. Book data is stored in memory and will reset on page refresh.

## Technologies

- **HTML5**: Semantic markup including the `<dialog>` element
- **CSS3**:
  - CSS Custom Properties (variables) for theming
  - CSS Grid for responsive layout
  - Modern pseudo-classes (`:user-valid`, `:user-invalid`)
  - CSS transitions for interactive elements
  - `interpolate-size` for smooth dialog animations
- **JavaScript (ES6+)**:
  - Constructor functions and prototypes
  - `crypto.randomUUID()` for unique identifiers
  - Event delegation for efficient event handling
  - Array methods (`forEach`, `filter`, `find`)
  - Template literals

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate comments.

## License

This project is open source. Feel free to use, modify, and distribute as needed.

---

**Note**: This is a learning project focused on practicing vanilla JavaScript, modern CSS, and clean code principles.
