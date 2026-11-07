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
  let isComposing = false;

  const cancelActiveSearch = () => {
    activeController?.abort();
    activeController = null;
  };

  const runSearch = async (query) => {
    cancelActiveSearch();
    const controller = new AbortController();
    activeController = controller;

    authorFilter.clear();
    showStatus('loading', 'Loading...');

    try {
      const books = await searchBooks(query, {
        signal: controller.signal,
      });

      if (activeController !== controller) {
        return;
      }

      if (books.length === 0) {
        showStatus('empty', 'No books found', 'Try a different title, author, or keyword.');
        return;
      }

      authorFilter.setBooks(books);
    } catch (error) {
      if (controller.signal.aborted || activeController !== controller) {
        return;
      }

      showStatus('error', 'Unable to load books', 'Check your connection and try searching again.');
    } finally {
      if (activeController === controller) {
        activeController = null;
      }
    }
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
      return;
    }

    debouncedSearch.cancel();
    void runSearch(query);
  });

  searchInput.addEventListener('input', handleInput);

  searchInput.addEventListener('compositionstart', () => {
    isComposing = true;
    debouncedSearch.cancel();

    if (activeController !== null) {
      cancelActiveSearch();

      showStatus('waiting', 'Waiting for input', 'Search will start when you stop typing.');
    }
  });

  searchInput.addEventListener('compositionend', () => {
    isComposing = false;
    handleInput();
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  void runSearch(DEFAULT_SEARCH_QUERY);
};
