import { createBookCard } from './book-card.js';

const booksGrid = document.querySelector('#books-grid');
const searchStatus = document.querySelector('#search-status');
const searchButton = document.querySelector('.search-button');

export const renderBooks = (books) => {
  const fragment = document.createDocumentFragment();

  books.forEach((book) => {
    fragment.append(createBookCard(book));
  });

  searchStatus.textContent = '';
  booksGrid.replaceChildren(fragment);
};

export const showSearchMessage = (message, { clearResults = true } = {}) => {
  if (clearResults) {
    booksGrid.replaceChildren();
  }

  searchStatus.textContent = message;
};

export const setSearchPending = (isPending) => {
  searchButton.textContent = isPending ? 'Searching...' : 'Search';
};
