const submitBtn = document.querySelector('#submitBtn');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
const allBooks = document.querySelector('.all-books-container');

function Storage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

const books = JSON.parse(localStorage.getItem('books')) || [];

const displayBookCollection = () => {
  Storage(books);
  if (books.length <= 0) {
    allBooks.innerHTML = '<h3 class="no-title">No book available.<br/> Please add a new book.</h3>';
  } else {
    let allBook = books.map(
      (item, index) => `<div class="book-item-container">
      <p> <span class="book-title">${item.title}</span> <span>by ${item.author}</span></p>
      <button onclick=Book.removeBooks(${index}) class="deleteBtn">Remove</button>
    </div>`,
    );
    allBook = allBook.join('');
    allBooks.innerHTML = allBook;
  }
};

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

  addBook() {
    books.push(this);
  }

  static removeBooks(index) {
    books.splice(index, 1);
    displayBookCollection();
  }
}

displayBookCollection();

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (bookTitle.value === '' && authorName.value === '' && isbnNumber === '') {
    return false;
  }
  const book = new Book(bookTitle.value, authorName.value, isbnNumber.value);
  books.push(book);
  displayBookCollection();
  bookTitle.value = '';
  authorName.value = '';
  isbnNumber.value = '';
  return true;
});