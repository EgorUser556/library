import { searchBooks } from '../api/book-api.js';
import { DEFAULT_SEARCH_QUERY } from '../api/config.js';
import {
  renderBooks,
  showSearchMessage,
  setSearchPending,
  setSearchValidation,
  showSearchFeedback,
} from '../components/book-card/book-view.js';

export const initBookSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('#search-input');

  let activeController = null;

  const runSearch = async (query) => {
    if (!query) {
      setSearchValidation('Enter a book title, author, or keyword.');
      searchInput.focus();
      return;
    }

    setSearchValidation();

    activeController?.abort();

    const controller = new AbortController();
    activeController = controller;

    setSearchPending(true);
    showSearchMessage('Loading...');

    try {
      const books = await searchBooks(query, {
        signal: controller.signal,
      });

      if (activeController !== controller) {
        return;
      }

      if (books.length === 0) {
        showSearchFeedback('No books found', 'Try a different title, author, or keyword.');
        return;
      }

      renderBooks(books);
    } catch (error) {
      if (controller.signal.aborted || activeController !== controller) {
        return;
      }

      showSearchFeedback('Unable to load books', 'Check your connection and try searching again.');
    } finally {
      if (activeController === controller) {
        activeController = null;
        setSearchPending(false);
      }
    }
  };

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    void runSearch(searchInput.value.trim());
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim()) {
      setSearchValidation();
    }
  });

  void runSearch(DEFAULT_SEARCH_QUERY);
};
