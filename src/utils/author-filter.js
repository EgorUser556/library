import { createElement } from './create-element.js';

export const initAuthorFilter = (onChange) => {
  const toolbar = document.querySelector('#books-toolbar');
  const authorSelect = document.querySelector('#filter');

  let sourceBooks = [];

  const applyFilter = () => {
    const selectedAuthor = authorSelect.value;

    const visibleBooks = selectedAuthor
      ? sourceBooks.filter((book) => book.authors.includes(selectedAuthor))
      : sourceBooks;

    onChange(visibleBooks);
  };

  const setBooks = (books) => {
    sourceBooks = books;

    const authors = [...new Set(books.flatMap((book) => book.authors))].sort((first, second) =>
      first.localeCompare(second),
    );

    const allAuthorsOption = createElement('option', '', 'All authors');
    allAuthorsOption.value = '';

    const authorOptions = authors.map((author) => {
      const option = createElement('option', '', author);
      option.value = author;

      return option;
    });

    authorSelect.replaceChildren(allAuthorsOption, ...authorOptions);
    authorSelect.value = '';
    authorSelect.disabled = authors.length === 0;

    toolbar.hidden = books.length === 0;

    applyFilter();
  };

  const clear = () => {
    sourceBooks = [];

    const allAuthorsOption = createElement('option', '', 'All authors');
    allAuthorsOption.value = '';

    authorSelect.replaceChildren(allAuthorsOption);
    authorSelect.disabled = true;

    toolbar.hidden = true;
  };

  authorSelect.addEventListener('change', applyFilter);

  return { setBooks, clear };
};
