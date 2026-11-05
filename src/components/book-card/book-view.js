import { createBookCard } from './book-card.js';

const booksGrid = document.querySelector('#books-grid');
const searchStatus = document.querySelector('#search-status');
const searchButton = document.querySelector('.search-button');
const libraryLayout = document.querySelector('.library-layout');

export const renderBooks = (books) => {
  const fragment = document.createDocumentFragment();

  books.forEach((book) => {
    fragment.append(createBookCard(book));
  });

  searchStatus.textContent = '';
  booksGrid.replaceChildren(fragment);
};

export const showSearchMessage = (message) => {
  booksGrid.replaceChildren();
  searchStatus.textContent = message;
};

export const setSearchPending = (isPending) => {
  libraryLayout.classList.toggle('is-loading', isPending);
  booksGrid.setAttribute('aria-busy', String(isPending));
  searchButton.textContent = isPending ? 'Searching...' : 'Search';
};
