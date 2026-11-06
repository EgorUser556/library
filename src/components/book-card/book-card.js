import { COVERS_URL } from '../../api/config.js';
import { isFavorite, toggleFavorite } from '../../store/favorites-store.js';

const updateFavoriteButton = (button, bookId) => {
  const active = isFavorite(bookId);

  button.setAttribute('aria-pressed', String(active));
};

export const createBookCard = (book) => {
  const card = document.createElement('article');
  card.className = 'book-card';
  card.dataset.bookId = book.id;

  const cover = document.createElement('div');
  cover.className = 'book-cover';

  const coverPlaceholder = document.createElement('span');
  coverPlaceholder.className = 'book-cover-placeholder';
  coverPlaceholder.textContent = 'No cover';

  cover.append(coverPlaceholder);

  if (book.coverId !== null) {
    const image = document.createElement('img');
    image.className = 'book-cover-image';
    image.alt = `Cover of ${book.title}`;
    image.loading = 'lazy';

    image.addEventListener(
      'load',
      () => {
        coverPlaceholder.remove();
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

  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'favorite-button';
  favoriteButton.type = 'button';

  updateFavoriteButton(favoriteButton, book.id, book.title);

  favoriteButton.addEventListener('click', () => {
    toggleFavorite(book);
  });

  cover.append(favoriteButton);

  const info = document.createElement('div');
  info.className = 'book-info';

  const title = document.createElement('h2');
  title.className = 'book-title';
  title.textContent = book.title;

  const author = document.createElement('p');
  author.className = 'book-author';
  author.textContent = book.authors.length ? book.authors.join(', ') : 'Unknown author';

  const year = document.createElement('p');
  year.className = 'book-year';
  year.textContent = book.year ?? 'Year unknown';

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
