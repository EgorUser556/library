import { SEARCH_URL, SEARCH_FIELDS, SEARCH_LIMIT } from './config.js';

const normalizeBook = (book) => {
  return {
    id: book.key,
    title: book.title || 'Untitled',
    authors: book.author_name ?? [],
    year: book.first_publish_year ?? null,
    coverId: book.cover_i ?? null,
  };
};

export const searchBooks = async (query, { signal } = {}) => {
  const url = new URL(SEARCH_URL);

  url.searchParams.set('q', query);
  url.searchParams.set('fields', SEARCH_FIELDS.join(','));
  url.searchParams.set('limit', String(SEARCH_LIMIT));

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Book search failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.docs)) {
    throw new Error('Invalid book search response');
  }

  return data.docs.map(normalizeBook);
};
