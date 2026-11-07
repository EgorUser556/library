import { THEME_STORAGE_KEY, THEME_MODES, DEFAULT_THEME } from './config.js';

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const listeners = new Set();

let theme = DEFAULT_THEME;
let initialized = false;

const loadTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);

    return THEME_MODES.includes(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

const saveTheme = () => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // При недоступном хранилище тема работает в текущей вкладке.
  }
};

const applyTheme = () => {
  const resolvedTheme = theme === 'system' ? (systemTheme.matches ? 'dark' : 'light') : theme;

  document.documentElement.dataset.theme = resolvedTheme;
};

const notifyListeners = () => {
  listeners.forEach((listener) => {
    listener(theme);
  });
};

export const getTheme = () => theme;

export const setTheme = (mode) => {
  if (!THEME_MODES.includes(mode) || theme === mode) {
    return;
  }

  theme = mode;

  applyTheme();
  saveTheme();
  notifyListeners();
};

export const subscribeTheme = (listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const initTheme = () => {
  if (initialized) {
    return;
  }

  initialized = true;
  theme = loadTheme();

  applyTheme();

  systemTheme.addEventListener('change', () => {
    if (theme === 'system') {
      applyTheme();
    }
  });

  notifyListeners();
};
