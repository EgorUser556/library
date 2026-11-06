import { searchBooks } from '../api/book-api.js';
import { DEFAULT_SEARCH_QUERY } from '../api/config.js';
import { renderBooks, showStatus, setSearchValidation } from '../components/book-card/book-view.js';
import { initAuthorFilter } from './author-filter.js';

export const initBookSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('#search-input');

  const authorFilter = initAuthorFilter(renderBooks);

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
