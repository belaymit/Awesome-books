const bookCollection = JSON.parse(localStorage.getItem('bookInfo') || '[]');
const submitBtn = document.querySelector('#submitBtn');
const form = document.querySelector('#book-form');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
const allBooks = document.querySelector('.all-books');

function displayBook() {
  const allBook = bookCollection.map(
    (item) => `<div class="book">
    <h3>${item.bookTitle}</h3>
    <p>
     ${item.authorName}
    </p>
    <button class="btn">Remove</button>
  </div>`
  );
  allBooks.innerHTML = allBook;
}

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
