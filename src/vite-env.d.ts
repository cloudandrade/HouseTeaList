/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
	/** Número da paleta (1–30). Ver `themes.md` e `src/config/themePalettes.js`. */
	readonly VITE_THEME_VARIATION?: string;
}
