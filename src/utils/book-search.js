import { searchBooks } from '../api/book-api.js';
import { DEFAULT_SEARCH_QUERY, SEARCH_DEBOUNCE_DELAY } from '../api/config.js';
import { renderBooks, showStatus, setSearchValidation } from '../components/book-card/book-view.js';
import { initAuthorFilter } from './author-filter.js';
import { debounce } from './debounce.js';

export const initBookSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('#search-input');

  const authorFilter = initAuthorFilter(renderBooks);

  let activeController = null;
  let lastQuery = null;

  const runSearch = async (query) => {
    if (query === lastQuery) {
      return;
    }

    activeController?.abort();
    const controller = new AbortController();
    activeController = controller;
    lastQuery = null;

    authorFilter.clear();
    showStatus('loading', 'Loading...');

    let books;

    try {
      books = await searchBooks(query, { signal: controller.signal });
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      console.log(error);
      showStatus('error', 'Unable to load books', 'Check your connection and try searching again.');
      return;
    }

    if (controller.signal.aborted) {
      return;
    }

    lastQuery = query;

    if (books.length === 0) {
      showStatus('empty', 'No books found', 'Try a different title, author, or keyword.');
      return;
    }

    authorFilter.setBooks(books);
  };

  const debouncedSearch = debounce((query) => {
    void runSearch(query);
  }, SEARCH_DEBOUNCE_DELAY);

  const handleInput = (event) => {
    if (event.isComposing) {
      return;
    }

    const value = searchInput.value;
    const query = value.trim();

    debouncedSearch.cancel();
    setSearchValidation();

    if (value === '') {
      void runSearch(DEFAULT_SEARCH_QUERY);
      return;
    }

    if (!query) {
      setSearchValidation('Enter a book title, author, or keyword.');
      return;
    }

    debouncedSearch(query);
  };

  searchInput.addEventListener('input', handleInput);
  searchInput.addEventListener('compositionend', handleInput);

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      setSearchValidation('Enter a book title, author, or keyword.');
      return;
    }

    debouncedSearch.cancel();
    void runSearch(query);
  });

  void runSearch(DEFAULT_SEARCH_QUERY);
};
