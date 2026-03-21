import { createMuiTheme } from '@material-ui/core/styles';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { APP_THEME } from './theme';

function safeFade(color, value) {
	try {
		return fade(color, value);
	} catch {
		return 'rgba(0, 0, 0, 0.12)';
	}
}

function safeDarken(color, coefficient) {
	try {
		return darken(color, coefficient);
	} catch {
		return color;
	}
}

/** @param {Record<'primary'|'accent'|'surface'|'backgroundB'|'text'|'textOnPrimary', string>} appTheme */
export function createAppMuiTheme(appTheme) {
	return createMuiTheme({
		palette: {
			primary: { main: appTheme.primary },
			secondary: { main: appTheme.accent },
			background: {
				default: appTheme.backgroundB,
				paper: appTheme.surface,
			},
			text: { primary: appTheme.text },
		},
		overrides: {
			MuiCheckbox: {
				colorPrimary: {
					color: appTheme.accent,
					'&$checked': {
						color: appTheme.primary,
					},
				},
			},
			MuiAccordion: {
				root: {
					boxShadow: 'none',
					'&:before': {
						backgroundColor: safeFade(appTheme.primary, 0.38),
					},
				},
			},
			MuiAccordionSummary: {
				root: {
					minHeight: 48,
				},
				expandIcon: {
					color: appTheme.primary,
				},
			},
			MuiButton: {
				containedPrimary: {
					backgroundColor: appTheme.primary,
					color: appTheme.textOnPrimary,
					'&:hover': {
						backgroundColor: safeDarken(appTheme.primary, 0.08),
					},
				},
			},
			MuiTypography: {
				colorPrimary: {
					color: appTheme.primary,
				},
			},
		},
	});
}

/** Tema estático inicial (compat); em runtime usa-se `createAppMuiTheme` no DynamicThemeProvider. */
export const muiTheme = createAppMuiTheme(APP_THEME);
