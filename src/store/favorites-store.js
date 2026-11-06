import { STORAGE_KEY } from './config.js';

const copyBook = (book) => ({
  id: book.id,
  title: book.title,
  authors: [...book.authors],
  year: book.year,
  coverId: book.coverId,
});

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return [];
    }

    const books = JSON.parse(saved);
    return Array.isArray(books) ? books : [];
  } catch (error) {
    return [];
  }
};

let favorites = loadFavorites();

const listeners = new Set();

export const getFavorites = () => favorites.map(copyBook);

export const isFavorite = (bookId) => {
  return favorites.some((book) => book.id === bookId);
};

const saveFavorites = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {}
};

const notifyListeners = () => {
  listeners.forEach((listener) => {
    listener(getFavorites());
  });
};

const updateFavorites = (books) => {
  favorites = books;
  saveFavorites();
  notifyListeners();
};

export const addFavorite = (book) => {
  if (isFavorite(book.id)) {
    return;
  }

  updateFavorites([...favorites, copyBook(book)]);
};

export const removeFavorite = (bookId) => {
  if (!isFavorite(bookId)) {
    return;
  }

  updateFavorites(favorites.filter((book) => book.id !== bookId));
};

export const toggleFavorite = (book) => {
  if (isFavorite(book.id)) {
    removeFavorite(book.id);
    return;
  }

  addFavorite(book);
};

export const subscribe = (listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};
