'use client';

import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';
import DemoStaticGiftList from '../components/DemoStaticGiftList';
import EventPublicView from '../components/EventPublicView';
import { DEMO_LANDING_PAGE_CONTENT } from '../config/defaultContent';
import { createAppMuiTheme } from '../config/muiTheme';
import { applyThemeCssVariables, getAppThemeFromVariation } from '../config/theme';

export default function HomePage() {
	const themeVariation =
		DEMO_LANDING_PAGE_CONTENT.themeVariation != null
			? DEMO_LANDING_PAGE_CONTENT.themeVariation
			: 1;
	const colors = useMemo(
		() => getAppThemeFromVariation(themeVariation),
		[themeVariation]
	);
	const muiTheme = useMemo(() => createAppMuiTheme(colors), [colors]);

	useEffect(() => {
		applyThemeCssVariables(colors);
	}, [colors]);

	const content = useMemo(
		() => ({
			...DEMO_LANDING_PAGE_CONTENT,
			theme: colors,
			themeVariation,
		}),
		[colors, themeVariation]
	);

	return (
		<ThemeProvider theme={muiTheme}>
			<EventPublicView content={content} loading={false} error={null}>
				<DemoStaticGiftList
					items={DEMO_LANDING_PAGE_CONTENT.listaInicialItens}
					content={content}
				/>
			</EventPublicView>
			<Box
				style={{
					maxWidth: 640,
					margin: '0 auto',
					padding: '16px 24px 32px',
					textAlign: 'center',
				}}
			>
				<Typography variant="body2" color="textSecondary" paragraph>
					Esta é uma página de <strong>demonstração</strong>. O teu evento fica
					num endereço próprio após a configuração.
				</Typography>
				<Typography variant="body2">
					<Link
						href="/config"
						style={{ color: colors.primary, fontWeight: 600 }}
					>
						Configurar com a tua chave de acesso
					</Link>
				</Typography>
			</Box>
		</ThemeProvider>
	);
}
