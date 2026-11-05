import { searchBooks } from '../api/book-api.js';
import { DEFAULT_SEARCH_QUERY } from '../api/config.js';
import {
  renderBooks,
  showSearchMessage,
  setSearchPending,
} from '../components/book-card/book-view.js';

export const initBookSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('#search-input');

  let activeController = null;

  const runSearch = async (query) => {
    activeController?.abort();
    activeController = null;

    if (!query) {
      setSearchPending(false);
      showSearchMessage('Enter a search query.');
      searchInput.focus();
      return;
    }

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
        showSearchMessage('No books found.');
        return;
      }

      renderBooks(books);
    } catch (error) {
      if (controller.signal.aborted || activeController !== controller) {
        return;
      }

      showSearchMessage('Unable to load books. Please try again.');
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

  void runSearch(DEFAULT_SEARCH_QUERY);
};
