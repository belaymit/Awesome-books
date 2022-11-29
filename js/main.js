const bookCollection = JSON.parse(localStorage.getItem('bookInfo') || '[]');
const submitBtn = document.querySelector('#submitBtn');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
let n = bookCollection[bookCollection.length-1].id;
class Book {
  constructor (id, title, author){
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook = (e) => {
    e.preventDefault();
    n += 1;
    const addNewBookData = new Book(n, bookTitle.value, authorName.value);
    console.log(addNewBookData);
    if (bookTitle.value && authorName.value && isbnNumber.value) {
      bookCollection.push(addNewBookData);
      localStorage.setItem('bookInfo', JSON.stringify(bookCollection));
      // displayBook();
      bookTitle.value = '';
      authorName.value = '';
      isbnNumber.value = '';
    }
  };
}
const addBook = (e) => {
  e.preventDefault();
  n += 1;
  const addNewBookData = new Book(n, bookTitle.value, authorName.value);
  console.log(addNewBookData);
  if (bookTitle.value && authorName.value && isbnNumber.value) {
    bookCollection.push(addNewBookData);
    localStorage.setItem('bookInfo', JSON.stringify(bookCollection));
    // displayBook();
    bookTitle.value = '';
    authorName.value = '';
    isbnNumber.value = '';
  }
};

submitBtn.addEventListener('click', addBook);
