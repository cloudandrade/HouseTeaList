/**
 * Cores do tema: `VITE_THEME_VARIATION` no `.env` até a API devolver outro valor em `app-settings`.
 * Paletas em `themePalettes.js`.
 */
import {
	getThemePaletteForVariation,
	THEME_PALETTE_COUNT,
} from './themePalettes';

const VITE_THEME_VARIATION = import.meta.env.VITE_THEME_VARIATION;

/** Número 1…N a partir do .env (fallback 1). */
export function parseEnvThemeVariation() {
	const n = Number.parseInt(String(VITE_THEME_VARIATION ?? '').trim(), 10);
	if (Number.isFinite(n) && n >= 1 && n <= THEME_PALETTE_COUNT) return n;
	return 1;
}

export function getAppThemeFromPalette(p) {
	return {
		primary: p.primary,
		accent: p.accent,
		surface: p.surface,
		backgroundA: p.backgroundA,
		backgroundB: p.backgroundB,
		text: p.text,
		textOnPrimary: p.textOnPrimary,
	};
}

export function getAppThemeFromVariation(rawId) {
	const p = getThemePaletteForVariation(rawId);
	return getAppThemeFromPalette(p);
}

const initialPalette = getThemePaletteForVariation(VITE_THEME_VARIATION);

/** Valores iniciais (antes do primeiro fetch /app-settings). */
export const APP_THEME = getAppThemeFromPalette(initialPalette);

export const APP_THEME_META = { id: initialPalette.id, name: initialPalette.name };

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
