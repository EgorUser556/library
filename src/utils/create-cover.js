import { COVERS_URL } from '../api/config.js';
import { createElement } from './create-element.js';

export const createCover = (book) => {
  const cover = createElement('div', 'cover');

  const placeholder = createElement('span', 'cover-placeholder', 'No cover');

  cover.append(placeholder);

  if (book.coverId !== null) {
    const image = document.createElement('img');
    image.className = 'cover-image';
    image.alt = 'cover-image';
    image.loading = 'lazy';

    image.addEventListener('load', () => {
      placeholder.remove();
    });

    image.src = `${COVERS_URL}/${book.coverId}-M.jpg?default=false`;
    cover.append(image);
  }

  return cover;
};
