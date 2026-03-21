import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createAppMuiTheme } from '../config/muiTheme';
import { applyThemeCssVariables, getAppThemeFromVariation } from '../config/theme';
import { useAppContent } from './AppContentContext';

export function DynamicThemeProvider({ children }) {
	const { content } = useAppContent();
	const colors = useMemo(
		() => getAppThemeFromVariation(content.themeVariation),
		[content.themeVariation]
	);
	const muiTheme = useMemo(() => createAppMuiTheme(colors), [colors]);

	useEffect(() => {
		applyThemeCssVariables(colors);
	}, [colors]);

	return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
