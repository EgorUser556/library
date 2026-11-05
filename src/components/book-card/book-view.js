import { createBookCard } from './book-card.js';

const booksGrid = document.querySelector('#books-grid');
const searchStatus = document.querySelector('#search-status');
const searchButton = document.querySelector('.search-button');
const libraryLayout = document.querySelector('.library-layout');
const searchInput = document.querySelector('#search-input');
const searchValidation = document.querySelector('#search-validation');

export const renderBooks = (books) => {
  const fragment = document.createDocumentFragment();
  libraryLayout.classList.remove('has-feedback');
  books.forEach((book) => {
    fragment.append(createBookCard(book));
  });

  delete searchStatus.dataset.state;
  searchStatus.textContent = '';
  booksGrid.replaceChildren(fragment);
};

export const showSearchMessage = (message) => {
  libraryLayout.classList.remove('has-feedback');
  booksGrid.replaceChildren();
  delete searchStatus.dataset.state;
  searchStatus.textContent = message;
};

export const setSearchPending = (isPending) => {
  libraryLayout.classList.toggle('is-loading', isPending);
  booksGrid.setAttribute('aria-busy', String(isPending));
  searchButton.textContent = isPending ? 'Searching...' : 'Search';
};

export const setSearchValidation = (message = '') => {
  searchValidation.textContent = message;
  if (message) {
    searchInput.setAttribute('aria-invalid', 'true');
  } else {
    searchInput.removeAttribute('aria-invalid');
  }
};

export const showSearchFeedback = (title, description, type = 'empty') => {
  booksGrid.replaceChildren();
  libraryLayout.classList.add('has-feedback');
  searchStatus.dataset.state = type;

  const heading = document.createElement('h2');
  heading.className = 'search-feedback-title';
  heading.textContent = title;

  const text = document.createElement('p');
  text.className = 'search-feedback-description';
  text.textContent = description;

  searchStatus.replaceChildren(heading, text);
};
