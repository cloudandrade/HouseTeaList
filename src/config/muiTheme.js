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

/**
 * Tema Material-UI alinhado com APP_THEME (.env), incluindo overrides que antes
 * herdavam o rosa por defeito da biblioteca.
 */
export const muiTheme = createMuiTheme({
	palette: {
		primary: { main: APP_THEME.primary },
		secondary: { main: APP_THEME.accent },
		background: {
			default: APP_THEME.backgroundB,
			paper: APP_THEME.surface,
		},
		text: { primary: APP_THEME.text },
	},
	overrides: {
		MuiCheckbox: {
			colorPrimary: {
				color: APP_THEME.accent,
				'&$checked': {
					color: APP_THEME.primary,
				},
			},
		},
		MuiAccordion: {
			root: {
				boxShadow: 'none',
				'&:before': {
					backgroundColor: safeFade(APP_THEME.primary, 0.38),
				},
			},
		},
		MuiAccordionSummary: {
			root: {
				minHeight: 48,
			},
			expandIcon: {
				color: APP_THEME.primary,
			},
		},
		MuiButton: {
			containedPrimary: {
				backgroundColor: APP_THEME.primary,
				color: APP_THEME.textOnPrimary,
				'&:hover': {
					backgroundColor: safeDarken(APP_THEME.primary, 0.08),
				},
			},
		},
		MuiTypography: {
			colorPrimary: {
				color: APP_THEME.primary,
			},
		},
	},
});
