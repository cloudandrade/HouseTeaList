/**
 * Cores do tema — variáveis `VITE_COLOR_*` no `.env`.
 * Valores hex devem ir entre aspas no `.env` (ex. `"#2e7d32"`): `#` sem aspas inicia comentário e o valor fica vazio.
 *
 * Cada `import.meta.env.VITE_*` está declarado em constante no topo do ficheiro.
 * Assim o Vite encontra todas as chaves no scan estático (evita casos em que
 * só parte das variáveis era injetada em dev/build).
 */
function colorFromEnv(value, fallback) {
	if (value == null) return fallback;
	const s = String(value).trim();
	return s !== '' ? s : fallback;
}

function firstColor(...candidates) {
	for (const c of candidates) {
		if (c == null) continue;
		const s = String(c).trim();
		if (s !== '') return s;
	}
	return null;
}

// Referências explícitas (obrigatório para o Vite substituir no bundle)
const VITE_COLOR_PRIMARY = import.meta.env.VITE_COLOR_PRIMARY;
const VITE_COLOR_ACCENT = import.meta.env.VITE_COLOR_ACCENT;
const VITE_COLOR_SURFACE = import.meta.env.VITE_COLOR_SURFACE;
const VITE_COLOR_BACKGROUND_A = import.meta.env.VITE_COLOR_BACKGROUND_A;
const VITE_COLOR_BACKGROUND_B = import.meta.env.VITE_COLOR_BACKGROUND_B;
const VITE_COLOR_TEXT = import.meta.env.VITE_COLOR_TEXT;
const VITE_COLOR_TEXT_ON_PRIMARY = import.meta.env.VITE_COLOR_TEXT_ON_PRIMARY;

/** Fallbacks neutros (azul) — já não usamos #f8bbd0 para não “parecer” que só o accent falha. */
const DEFAULT_PRIMARY = '#1565c0';
const DEFAULT_ACCENT = '#90caf9';

const resolvedPrimary = colorFromEnv(VITE_COLOR_PRIMARY, DEFAULT_PRIMARY);
const resolvedAccent = colorFromEnv(VITE_COLOR_ACCENT, DEFAULT_ACCENT);

export const APP_THEME = {
	primary: resolvedPrimary,

	accent: resolvedAccent,

	surface: colorFromEnv(VITE_COLOR_SURFACE, '#ffffff'),

	backgroundA: colorFromEnv(
		firstColor(VITE_COLOR_BACKGROUND_A, VITE_COLOR_ACCENT),
		'#eef2f6'
	),

	backgroundB: colorFromEnv(VITE_COLOR_BACKGROUND_B, '#ffffff'),

	text: colorFromEnv(VITE_COLOR_TEXT, '#212121'),

	textOnPrimary: colorFromEnv(VITE_COLOR_TEXT_ON_PRIMARY, '#ffffff'),
};

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
