const submitBtn = document.querySelector('#submitBtn');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
const allBooks = document.querySelector('.all-books-container');
console.log(allBooks);
// let n = 0;
// if (bookCollection.length > 0) {
//   n = bookCollection[bookCollection.length - 1];
// }
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    const temp = JSON.parse(localStorage.getItem('bookInfo'));
    this.bookInfo = [...temp.bookInfo];
  }

  addBook(id, bookTitle, authorName) {
    const newBook = new Book(id, bookTitle, authorName);
    this.bookInfo.push(newBook);
  }

  displayBookCollection() {
    console.log(this.bookInfo);
    // if (this.bookInfo.bookInfo.length <= 0) {
    //   allBooks.innerHTML =
    //     '<h3 class="no-title">No book available.<br/> Please add a new book.</h3>';
    // } else {
    //   let allBook = this.bookInfo.bookInfo.map(
    //     (item, index) => `<div class="book-item-container">
    //     <p>${item.bookTitle} by ${item.authorName}</p>
    //     <button class="deleteBtn" onclick="removeBook(${index})">Remove</button>
    //   </div>`
    //   );
    //   allBook = allBook.join('');
    //   allBooks.innerHTML = allBook;
    // }
  }
}

const bookCollection = new BookCollection();

let n = 0;
if (bookCollection.bookInfo.length > 0) {
  n = bookCollection.bookInfo.length;
}

const addBook = (e) => {
  e.preventDefault();
  n += 1;

  if (bookTitle.value && authorName.value && isbnNumber.value) {
    bookCollection.addBook(n, bookTitle.value, authorName.value);
    localStorage.setItem('bookInfo', JSON.stringify(bookCollection));
    // bookCollection.displayBookCollection();
    bookTitle.value = '';
    authorName.value = '';
    isbnNumber.value = '';
  }
};
bookCollection.displayBookCollection();

submitBtn.addEventListener('click', addBook);
