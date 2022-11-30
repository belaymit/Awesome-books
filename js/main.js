const submitBtn = document.querySelector('#submitBtn');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
const allBooks = document.querySelector('.all-books-container');
const storage = JSON.parse(localStorage.getItem('bookInfo'));
let books = storage === null ? [] : storage;
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
  }

  addBook(id, bookTitle, authorName) {
    const newBook = new Book(id, bookTitle, authorName);
    books.push(newBook);
  }

  displayBookCollection() {
    if (books.length <= 0) {
      allBooks.innerHTML = '<h3 class="no-title">No book available.<br/> Please add a new book.</h3>';
      } else {
      let allBook = books.map(
        (item) => {
          return `<div class="book-item-container">
        <p>${item.title} by ${item.author}</p>
        <button class="deleteBtn" id="${item.id}">Remove</button>
      </div>`
        }
      );
      allBook = allBook.join('');
      allBooks.innerHTML = allBook;
    }
    document.querySelectorAll('.deleteBtn').forEach((element) => {
      element.addEventListener('click', (e) => {
        const bookId = parseInt(e.target.id, 10);
        books = books.filter(item => item.id !== bookId);
        localStorage.setItem('bookInfo', JSON.stringify(books));
        this.displayBookCollection();
      });
    });
  }
  
  //displayBookCollection()
}

const bookCollection = new BookCollection();

let n = -1;
if (books.length > 0) {
  n = books[books.length-1].id;
}

const addBook = (e) => {
  e.preventDefault();
  n += 1;

  if (bookTitle.value && authorName.value && isbnNumber.value) {
    bookCollection.addBook(n, bookTitle.value, authorName.value);
    localStorage.setItem('bookInfo', JSON.stringify(books));
    bookCollection.displayBookCollection();
    bookTitle.value = '';
    authorName.value = '';
    isbnNumber.value = '';
  }
};
bookCollection.displayBookCollection();

submitBtn.addEventListener('click', addBook);
