import { createBookCard } from './book-card.js';

const booksGrid = document.querySelector('#books-grid');
const searchStatus = document.querySelector('#search-status');
const searchInput = document.querySelector('#search-input');
const searchValidation = document.querySelector('#search-validation');

const updateLoadingControls = (isLoading) => {
  booksGrid.setAttribute('aria-busy', String(isLoading));
};

export const showStatus = (state, title, description = '') => {
  booksGrid.replaceChildren();
  searchStatus.dataset.state = state;

  const heading = document.createElement('h2');
  heading.className = 'search-feedback-title';
  heading.textContent = title;

  searchStatus.replaceChildren(heading);

  if (description) {
    const text = document.createElement('p');
    text.className = 'search-feedback-description';
    text.textContent = description;

    searchStatus.append(text);
  }

  updateLoadingControls(state === 'loading');
};

export const renderBooks = (books) => {
  booksGrid.replaceChildren(...books.map((book) => createBookCard(book)));

  delete searchStatus.dataset.state;
  searchStatus.replaceChildren();

  updateLoadingControls(false);
};

export const setSearchValidation = (message = '') => {
  searchValidation.textContent = message;
  if (message) {
    searchInput.setAttribute('aria-invalid', 'true');
  } else {
    searchInput.removeAttribute('aria-invalid');
  }
};
