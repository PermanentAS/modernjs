//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    //create tr elem
    const row = document.createElement('tr');

    //Inserc cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">&times;</a></td>
    `;

    list.appendChild(row);
}

//Show allert
UI.prototype.showAllert = function(message, className) {
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3s
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Storage constructor
function Store() {}

Store.prototype.getBooks = function() {
    let books;

    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
}

Store.prototype.displayBooks = function() {
    const store = new Store();
    
    const books = store.getBooks();

    books.forEach(function(book){
        const ui = new UI;

        ui.addBookToList(book);
    });
}

Store.prototype.addBook = function(book) {
    const store = new Store();
    
    const books = store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

Store.prototype.removeBook = function(isbn) {
    const store = new Store();

    const books = store.getBooks();

    books.forEach(function(book, index){
        if(book.isbn === isbn) {
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}


//DOM load event
document.addEventListener('DOMContentLoaded', function(){
    const store = new Store();
    store.displayBooks();
})

//Event listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    //Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiating book 
    const book = new Book(title, author, isbn);

    //Instantiating UI
    const ui = new UI();
    const store = new Store();

    //Validate
    if (title === '' || author === '' || isbn === '') {
        //Error alert
        ui.showAllert('Please fill in all fields', 'error');
    } else {
        //Add book to list
        ui.addBookToList(book);
        
        //Add to LS
        store.addBook(book);

        //Show success
        ui.showAllert('Book added', 'success');

        //clear fields
        ui.clearFields();       
    }

    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    //Instantiating UI
    const ui = new UI();
    const store = new Store();

    ui.deleteBook(e.target);

    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAllert('Book removed', 'success');

    e.preventDefault();
})