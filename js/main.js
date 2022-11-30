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
const getCurrentTime = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const currentMonth = months[date.getMonth()];
  const currentDate = date.getDate();
  const currentYear = date.getFullYear();
  const currentTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: '2-digit',
    hour12: true,
  });
  let temp = '';
  if (currentDate === 1) {
    temp = 'st';
  } else if (currentDate === 2) {
    temp = 'nd';
  } else if (currentDate === 3) {
    temp = 'rd';
  } else {
    temp = 'th';
  }
  document.querySelector(
    '#current-time',
  ).innerText = `${currentMonth} ${currentDate}${temp}  ${currentYear}, ${currentTime}`;
};

getCurrentTime();

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
      allBooks.innerHTML = '<h3 class="no-title">No book available.<br/> Please add a new book.</h3>';
    } else {
      let allBook = this.bookInfo.map(
        (item) => `<div class="book-item-container">
        <p>${item.title} by ${item.author}</p>
        <button class="deleteBtn" id="${item.id}">Remove</button>
      </div>`,
      );
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

const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');
const icon = navToggle.querySelector('.fa-times');
const openIcon = navToggle.querySelector('.fa-bars');

navToggle.addEventListener('click', () => {
  links.classList.toggle('show-links');
  icon.classList.toggle('close-icon');
  openIcon.classList.toggle('open-icon');