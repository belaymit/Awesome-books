const bookCollection = JSON.parse(localSto
rage.getItem('bookInfo') || '[]');
const submitBtn = document.querySelector('#submitBtn');
const bookTitle = document.querySelector('#bookTitle');
const authorName = document.querySelector('#authorName');
const isbnNumber = document.querySelector('#isbnNumber');

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
    // displayBook();
    bookTitle.value = '';
    authorName.value = '';
    isbnNumber.value = '';
  }
};

submitBtn.addEventListener('click', addBook);
