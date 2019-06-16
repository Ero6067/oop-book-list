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
    <td><a href="#" class="delete">X<a></td>
    `;
  list.appendChild(row);
};

//Event Listener
document.getElementById('book-form').addEventListener('submit', function(e) {
  //Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiating a book
  const book = new Book(title, author, isbn);

  //Instaniate UI
  const ui = new UI();

  //Add book to list
  ui.addBookToList(book);

  e.preventDefault();
});
