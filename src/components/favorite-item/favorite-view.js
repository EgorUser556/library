import { getFavorites, removeFavorite, subscribe } from '../../store/favorites-store.js';
import { createFavoriteItem } from './favorite-item.js';

const favoritesList = document.querySelector('#favorites-list');
const favoritesCount = document.querySelector('#favorites-count');

const renderFavorites = (books) => {
  const count = books.length;

  favoritesCount.textContent = `${count} ${count === 1 ? 'book' : 'books'} saved`;

  if (count === 0) {
    const message = document.createElement('p');
    message.className = 'favorites-empty';
    message.textContent = 'No favorites yet. Click the heart on a book to save it.';

    favoritesList.replaceChildren(message);
    return;
  }

  favoritesList.replaceChildren(...books.map((book) => createFavoriteItem(book, removeFavorite)));
};

export const initFavorites = () => {
  renderFavorites(getFavorites());
  return subscribe(renderFavorites);
};
