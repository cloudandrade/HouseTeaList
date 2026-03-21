import { DEFAULT_APP_PAGE_CONTENT } from './defaultContent';
import { APP_THEME } from './theme';

/**
 * Referência estática (defaults + tema). A app principal usa `useAppContent()` para
 * conteúdo possivelmente sobrescrito pela API (`GET /app-settings`).
 */
export const APP_CONTENT = {
	...DEFAULT_APP_PAGE_CONTENT,
	theme: APP_THEME,
};

export { DEFAULT_APP_PAGE_CONTENT };
export { APP_THEME };
