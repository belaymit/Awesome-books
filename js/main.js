let bookCollection = JSON.parse(localStorage.getItem('bookInfo') || '[]');
const submitBtn = document.querySelector('#submitBtn');
const form = document.querySelector('#book-form');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
const allBooks = document.querySelector('.all-books');
const removeBookBtn = document.querySelector('.removeBookBtn');

function displayBook() {
  let allBook = bookCollection.map((item, index) => `<div class="book">
  <h3>${item.bookTitle}</h3>
    <p>
     ${item.authorName}
    </p>
    <button class="removeBookBtn" onclick="removeBook(${index})">Remove</button>
  </div>`);
  allBook = allBook.join('');
  allBooks.innerHTML = allBook;
}

displayBook();

const removeBook = (bookId) => {
  // bookCollection.splice(bookId, 1);
  bookCollection = bookCollection.filter((item, index) => {
    if(index = bookId){
      console.log(index+"=false");
      return false;
    }
    return true;
  });
  localStorage.setItem('bookInfo', JSON.stringify(bookCollection));
  displayBook();
};

const addBook = (e) => {
  e.preventDefault();
  const addNewBookData = {
    bookTitle: bookTitle.value,
    authorName: authorName.value,
    isbnNumber: isbnNumber.value,
  };
  bookCollection.push(addNewBookData);
  localStorage.setItem('bookInfo', JSON.stringify(bookCollection));
  displayBook();
  bookTitle.value = '';
  authorName.value = '';
  isbnNumber.value = '';
};

submitBtn.addEventListener('click', addBook);

removeBookBtn.addEventListener('click', removeBook(bookCollection.id));