// eslint-disable-next-line max-classes-per-file
const submitBtn = document.querySelector('#submitBtn');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
const allBooks = document.querySelector('.all-books-container');
const storage = JSON.parse(localStorage.getItem('bookInfo'));

// set local storage
const setLocalStorage = (bookCollection) => {
  localStorage.setItem('bookInfo', JSON.stringify(bookCollection));
};

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.bookInfo = storage === null ? [] : storage;
  }

  addBook(id, bookTitle, authorName) {
    const newBook = new Book(id, bookTitle, authorName);
    this.bookInfo.push(newBook);
    setLocalStorage(this.bookInfo);
    this.displayBookCollection();
  }

  displayBookCollection() {
    if (this.bookInfo.length <= 0) {
      allBooks.innerHTML =
        '<h3 class="no-title">No book available.<br/> Please add a new book.</h3>';
    } else {
      let allBook = this.bookInfo.map((item) => `<div class="book-item-container">
        <p>${item.title} by ${item.author}</p>
        <button class="deleteBtn" id="${item.id}">Remove</button>
      </div>`);
      allBook = allBook.join('');
      allBooks.innerHTML = allBook;
    }
    document.querySelectorAll('.deleteBtn').forEach((element) => {
      element.addEventListener('click', (e) => {
        const bookId = parseInt(e.target.id, 10);
        this.bookInfo = this.bookInfo.filter((item) => item.id !== bookId);
        setLocalStorage(this.bookInfo);
        this.displayBookCollection();
      });
    });
  }
}

const bookCollection = new BookCollection();

const addBook = (e) => {
  e.preventDefault();

  // const ids = bookCollection.bookInfo.map((object) => object.id); [1,2,3]
  // const max = ids.length == 0 ? 0 : Math.max.apply(null, ids) + 1;[1,2,3]

  let temp = -1;
  // eslint-disable-next-line array-callback-return
  bookCollection.bookInfo.map((object) => {
    if (object.id > temp) {
      temp = object.id;
    }
  });

  if (bookTitle.value && authorName.value && isbnNumber.value) {
    bookCollection.addBook(temp + 1, bookTitle.value, authorName.value);
    bookTitle.value = '';
    authorName.value = '';
    isbnNumber.value = '';
  }
};

bookCollection.displayBookCollection();
submitBtn.addEventListener('click', addBook);

const bookList = document.querySelector('#nav-booklist a');
const addNewBook = document.querySelector('#nav-add a');
const contact = document.querySelector('#nav-contact a');
const bookListSection = document.getElementById('bookList');
const addNewBookSection = document.getElementById('addNewBook');
const contactSection = document.getElementById('contact');

bookList.addEventListener('click', () => {
  bookList.classList.add('active');
  addNewBook.classList.remove('active');
  contact.classList.remove('active');
  bookListSection.classList.remove('hidden');
  addNewBookSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

addNewBook.addEventListener('click', () => {
  bookList.classList.remove('active');
  addNewBook.classList.add('active');
  contact.classList.remove('active');
  bookListSection.classList.add('hidden');
  addNewBookSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
});

contact.addEventListener('click', () => {
  bookList.classList.remove('active');
  addNewBook.classList.remove('active');
  contact.classList.add('active');
  bookListSection.classList.add('hidden');
  addNewBookSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
});
