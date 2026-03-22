'use client';

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { DEFAULT_APP_PAGE_CONTENT } from '../config/defaultContent';
import {
	getAppThemeFromVariation,
	parseEnvThemeVariation,
} from '../config/theme';
import { getThemePaletteForVariation } from '../config/themePalettes';
import { getAppSettings } from '../service/requestService';

const AppContentContext = createContext(null);

function resolveThemeVariation(apiPayload) {
	if (
		apiPayload != null &&
		apiPayload.themeVariation != null &&
		String(apiPayload.themeVariation).trim() !== ''
	) {
		return getThemePaletteForVariation(apiPayload.themeVariation).id;
	}
	return parseEnvThemeVariation();
}

function buildMergedContent(apiPayload) {
	const themeVariation = resolveThemeVariation(apiPayload);
	const theme = getAppThemeFromVariation(themeVariation);

	if (!apiPayload) {
		return {
			...DEFAULT_APP_PAGE_CONTENT,
			themeVariation,
			theme,
		};
	}
	const { heroImageDataUrl, ...rest } = apiPayload;
	return {
		...rest,
		themeVariation,
		theme,
		heroImage:
			heroImageDataUrl && String(heroImageDataUrl).trim() !== ''
				? heroImageDataUrl
				: DEFAULT_APP_PAGE_CONTENT.heroImage,
		listaInicialItens: DEFAULT_APP_PAGE_CONTENT.listaInicialItens,
		accordion: {
			...DEFAULT_APP_PAGE_CONTENT.accordion,
			...(apiPayload.accordion || {}),
		},
	};
}

export function AppContentProvider({ children }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [remote, setRemote] = useState(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await getAppSettings();
			setRemote(data);
		} catch (e) {
			console.error(e);
			setError(e);
			setRemote(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void load();
	}, [load]);

	const content = useMemo(
		() => buildMergedContent(remote),
		[remote]
	);

	const value = useMemo(
		() => ({
			content,
			loading,
			error,
			reload: load,
		}),
		[content, loading, error, load]
	);

	return (
		<AppContentContext.Provider value={value}>
			{children}
		</AppContentContext.Provider>
	);
}

export function useAppContent() {
	const ctx = useContext(AppContentContext);
	if (!ctx) {
		throw new Error('useAppContent deve ser usado dentro de AppContentProvider');
	}
	return ctx;
}
