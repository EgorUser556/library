import { getFavorites, removeFavorite, subscribe } from '../../store/favorites-store.js';
import { createFavoriteItem } from './favorite-item.js';
import { createElement } from '../../utils/create-element.js';

const favoritesList = document.querySelector('#favorites-list');
const favoritesCount = document.querySelector('#favorites-count');

const renderFavorites = (books) => {
  const count = books.length;

  favoritesCount.textContent = `${count} ${count === 1 ? 'book' : 'books'} saved`;

  if (count === 0) {
    const message = createElement(
      'p',
      'favorites-empty',
      'No favorites yet. Click the heart on a book to save it.',
    );

    favoritesList.replaceChildren(message);
    return;
  }

  favoritesList.replaceChildren(...books.map((book) => createFavoriteItem(book, removeFavorite)));
};

export const initFavorites = () => {
  renderFavorites(getFavorites());
  return subscribe(renderFavorites);
};
