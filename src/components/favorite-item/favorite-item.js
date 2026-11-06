import { COVERS_URL } from '../../api/config.js';

export const createFavoriteItem = (book, onRemove) => {
  const item = document.createElement('article');
  item.className = 'favorite-item';
  item.dataset.bookId = book.id;

  const cover = document.createElement('div');
  cover.className = 'favorite-cover';

  const placeholder = document.createElement('span');
  placeholder.className = 'favorite-cover-placeholder';
  placeholder.textContent = 'No cover';

  cover.append(placeholder);

  if (book.coverId !== null) {
    const image = document.createElement('img');
    image.className = 'favorite-cover-image';
    image.alt = `Cover of ${book.title}`;
    image.loading = 'lazy';

    image.addEventListener(
      'load',
      () => {
        placeholder.remove();
      },
      { once: true },
    );

    image.addEventListener(
      'error',
      () => {
        image.remove();
      },
      { once: true },
    );

    image.src = `${COVERS_URL}/${book.coverId}-M.jpg?default=false`;

    cover.append(image);
  }

  const info = document.createElement('div');
  info.className = 'favorite-info';

  const title = document.createElement('h3');
  title.className = 'favorite-title';
  title.textContent = book.title;

  const author = document.createElement('p');
  author.className = 'favorite-author';
  author.textContent = book.authors.length ? book.authors.join(', ') : 'Unknown author';

  const year = document.createElement('p');
  year.className = 'favorite-year';
  year.textContent = book.year ?? 'Year unknown';

  const removeButton = document.createElement('button');
  removeButton.className = 'favorite-remove';
  removeButton.type = 'button';
  removeButton.setAttribute('aria-label', `Remove ${book.title} from favorites`);

  removeButton.addEventListener('click', () => {
    onRemove(book.id);
  });

  info.append(title, author, year);
  item.append(cover, info, removeButton);

  return item;
};
