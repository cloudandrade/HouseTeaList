import { DEMO_LANDING_PAGE_CONTENT } from './defaultContent';
import { APP_THEME } from './theme';

/**
 * Referência estática da demo da home (`/`) + tema.
 * Páginas de evento usam `useAppContent()` (API); não misturar com esta demo.
 */
export const APP_CONTENT = {
	...DEMO_LANDING_PAGE_CONTENT,
	theme: APP_THEME,
};

export { DEMO_LANDING_PAGE_CONTENT };
