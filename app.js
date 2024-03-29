// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  //Create tr element
  const row = document.createElement('tr');
  //Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X<a></td>
    `;
  list.appendChild(row);
};

//Show alert
UI.prototype.showAlert = function(message, className) {
  //create a div
  const div = document.createElement('div');
  //add class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  //Get form
  const form = document.querySelector('#book-form');

  //insert alert
  container.insertBefore(div, form);

  //Timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

//Delete Book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Clear text fields
UI.prototype.clearTextField = function() {
  document.getElementById('title').value = ' ',
  document.getElementById('author').value = ' ',
  document.getElementById('isbn').value = ' ';
}

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

  //Validate 
  if (title === '' || author === '' || isbn === '') {
    //console.log(ui);
    //Error alert
    ui.showAlert('Please fill in all the fields', 'error');
  } else {

    //Add book to list
    ui.addBookToList(book);

    //Show success
    ui.showAlert(`'${book.title} by ${book.author} successfully added`, 'success');
  
    //Clear fields
    ui.clearTextField();
  };

  e.preventDefault();
});

//Event Listener for remove book

document.getElementById('book-list').addEventListener
('click', function(e) {

  const ui = new UI();

  ui.deleteBook(e.target);

  //show alert
  ui.showAlert('Book Removed!', 'success')

  e.preventDefault();
});