class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
      `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    //Create a div
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');

    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3 seconds
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearTextFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
  }
}

//Local Storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      //Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Instantiating a book
  const book = new Book(title, author, isbn);

  //Instaniate UI
  const ui = new UI();

  console.log(ui);

  //Validate
  if (title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill in all the fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Add to LS
    Store.addBook(book);

    //Show success
    ui.showAlert(
      `'${book.title} by ${book.author} successfully added`,
      'success'
    );

    //Clear fields
    ui.clearTextField();
  }

  e.preventDefault();
});

//Event Listener for remove book

document.getElementById('book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
