import { getTheme, setTheme, subscribeTheme } from '../../theme/theme-manager.js';

export const initThemeSwitcher = () => {
  const themeSelect = document.querySelector('#theme-select');

  const updateSelect = (mode) => {
    themeSelect.value = mode;
  };

  themeSelect.addEventListener('change', () => {
    setTheme(themeSelect.value);
  });
  updateSelect(getTheme());
  return subscribeTheme(updateSelect);
};
