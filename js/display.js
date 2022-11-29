let bookCollection = JSON.parse(localStorage.getItem('bookInfo') || '[]');
const allBooks = document.querySelector('.all-books-container');

function displayBook() {
  if (bookCollection.length <= 0) {
    allBooks.innerHTML = '<h3 class="no-title">No book available.<br/> Please add a new book.</h3>';
  } else {
    let allBook = bookCollection.map(
      (item, index) => `<div class="book-item-container">
      <p>${item.bookTitle} by ${item.authorName}</p>
      <button class="deleteBtn" onclick="removeBook(${index})">Remove</button>
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
