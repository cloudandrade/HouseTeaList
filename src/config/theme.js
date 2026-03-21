/**
 * Tema ativo a partir de `VITE_THEME_VARIATION` (1–30) no `.env`.
 * Paletas definidas em `themePalettes.js`; referência visual em `themes.md` na raiz do projeto.
 */
import { getThemePaletteForVariation } from './themePalettes';

const VITE_THEME_VARIATION = import.meta.env.VITE_THEME_VARIATION;
const palette = getThemePaletteForVariation(VITE_THEME_VARIATION);

export const APP_THEME = {
	primary: palette.primary,
	accent: palette.accent,
	surface: palette.surface,
	backgroundA: palette.backgroundA,
	backgroundB: palette.backgroundB,
	text: palette.text,
	textOnPrimary: palette.textOnPrimary,
};

/** Metadados da paleta escolhida (id e nome). */
export const APP_THEME_META = { id: palette.id, name: palette.name };

export function applyThemeCssVariables(theme = APP_THEME) {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	root.style.setProperty('--color-primary', theme.primary);
	root.style.setProperty('--color-accent', theme.accent);
	root.style.setProperty('--color-surface', theme.surface);
	root.style.setProperty('--color-background-a', theme.backgroundA);
	root.style.setProperty('--color-background-b', theme.backgroundB);
	root.style.setProperty('--color-text', theme.text);
	root.style.setProperty('--color-text-on-primary', theme.textOnPrimary);
}

applyThemeCssVariables();
