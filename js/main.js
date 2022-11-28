let bookCollection = JSON.parse(localStorage.getItem('bookInfo') || '[]');

const submitBtn = document.querySelector('#submitBtn');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');
const allBooks = document.querySelector('.all-books');

function displayBook() {
  if (bookCollection.length <= 0) {
    allBooks.innerHTML = '<h3 class="no-title">No book available.<br/> Please add a new book.</h3>';
  } else {
    let allBook = bookCollection.map(
      (item, index) => `<div class="book">
    <h2>${item.bookTitle}</h2>
      <p>
       ${item.authorName}
      </p>
      <p>
       ${item.isbnNumber}
      </p>
      <button class="removeBookBtn" onclick="removeBook(${index})">Remove</button>
    </div>`,
    );
    allBook = allBook.join('');
    allBooks.innerHTML = allBook;
  }
}

displayBook();

// eslint-disable-next-line no-unused-vars
const removeBook = (bookId) => {
  bookCollection = bookCollection.filter((item, index) => index !== bookId);
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

  if (bookTitle.value && authorName.value && isbnNumber.value) {
    bookCollection.push(addNewBookData);
    localStorage.setItem('bookInfo', JSON.stringify(bookCollection));
    displayBook();
    bookTitle.value = '';
    authorName.value = '';
    isbnNumber.value = '';
  }
};

submitBtn.addEventListener('click', addBook);
