import { isFavorite, toggleFavorite } from '../../store/favorites-store.js';
import { createCover } from '../../utils/create-cover.js';
import { createElement } from '../../utils/create-element.js';

const updateFavoriteButton = (button, bookId) => {
  const active = isFavorite(bookId);
  button.setAttribute('aria-pressed', String(active));
};

export const createBookCard = (book) => {
  const card = createElement('article', 'book-card');
  card.dataset.bookId = book.id;

  const cover = createCover(book);
  cover.classList.add('book-cover');

  const favoriteButton = createElement('button', 'favorite-button');
  favoriteButton.type = 'button';

  updateFavoriteButton(favoriteButton, book.id);

  favoriteButton.addEventListener('click', () => {
    toggleFavorite(book);
  });

  cover.append(favoriteButton);

  const info = createElement('div', 'book-info');
  const title = createElement('h2', 'book-title', book.title);
  const author = createElement(
    'p',
    'book-author',
    book.authors.length ? book.authors.join(', ') : 'Unknown author',
  );

  const year = createElement('p', 'book-year', book.year ?? 'Year unknown');

  info.append(title, author, year);
  card.append(cover, info);

  return card;
};

export const syncFavoriteButtons = () => {
  document.querySelectorAll('.book-card').forEach((card) => {
    const button = card.querySelector('.favorite-button');

    updateFavoriteButton(button, card.dataset.bookId);
  });
};
