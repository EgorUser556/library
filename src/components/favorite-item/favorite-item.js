import { createCover } from '../../utils/create-cover.js';
import { createElement } from '../../utils/create-element.js';

export const createFavoriteItem = (book, onRemove) => {
  const item = createElement('article', 'favorite-item');

  const cover = createCover(book);
  cover.classList.add('favorite-cover');

  const info = createElement('div', 'favorite-info');
  const title = createElement('h3', 'favorite-title', book.title);
  const author = createElement(
    'p',
    'favorite-author',
    book.authors.length ? book.authors.join(', ') : 'Unknown author',
  );

  const year = createElement('p', 'favorite-year', book.year ?? 'Year unknown');

  const removeButton = createElement('button', 'favorite-remove');
  removeButton.type = 'button';
  removeButton.setAttribute('aria-label', `Remove ${book.title} from favorites`);

  removeButton.addEventListener('click', () => {
    onRemove(book.id);
  });

  info.append(title, author, year);
  item.append(cover, info, removeButton);

  return item;
};
