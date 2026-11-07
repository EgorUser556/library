import './styles/main.css';

import { initTheme } from './theme/theme-manager.js';
import { initThemeSwitcher } from './components/theme-switcher/theme-switcher.js';
import { initBookSearch } from './utils/book-search.js';
import { initFavorites } from './components/favorite-item/favorite-view.js';
import { syncFavoriteButtons } from './components/book-card/book-card.js';
import { subscribe } from './store/favorites-store.js';

initTheme();
initThemeSwitcher();
subscribe(syncFavoriteButtons);
initBookSearch();
initFavorites();
