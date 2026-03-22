'use client';

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	getAppThemeFromVariation,
	parseEnvThemeVariation,
} from '../config/theme';
import { getThemePaletteForVariation } from '../config/themePalettes';
import { getAppSettings } from '../service/requestService';
import { NAME_REQUIRED_ALERT } from '../config/systemMessages';

const AppContentContext = createContext(null);

const EMPTY_ACCORDION = {
	nameFieldLabel: '',
	signButton: '',
	signedByPrefix: '',
	nameRequiredAlert: NAME_REQUIRED_ALERT,
};

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

function normalizeAccordion(acc) {
	const out = { ...EMPTY_ACCORDION };
	if (!acc || typeof acc !== 'object') return out;
	for (const k of Object.keys(EMPTY_ACCORDION)) {
		if (acc[k] != null) out[k] = String(acc[k]);
	}
	return out;
}

/**
 * Conteúdo para páginas de tenant: só o que vem da API (sem copy da demo da home).
 */
function buildMergedContent(apiPayload) {
	if (!apiPayload) {
		const themeVariation = parseEnvThemeVariation();
		return {
			documentTitle: '',
			heroTitle: '',
			listSubtitle: '',
			introPrimary: '',
			introNote: '',
			introShipping: '',
			themeVariation,
			theme: getAppThemeFromVariation(themeVariation),
			heroImage: '',
			accordion: { ...EMPTY_ACCORDION },
		};
	}
	const themeVariation = resolveThemeVariation(apiPayload);
	const theme = getAppThemeFromVariation(themeVariation);
	const { heroImageDataUrl, accordion, ...rest } = apiPayload;
	return {
		...rest,
		themeVariation,
		theme,
		heroImage:
			heroImageDataUrl && String(heroImageDataUrl).trim() !== ''
				? heroImageDataUrl
				: '',
		accordion: normalizeAccordion(accordion),
	};
}

export function AppContentProvider({ children, slug }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [remote, setRemote] = useState(null);

	const load = useCallback(async () => {
		if (!slug || String(slug).trim() === '') {
			setLoading(false);
			setError(new Error('Slug em falta'));
			setRemote(null);
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const { data } = await getAppSettings(slug);
			setRemote(data);
		} catch (e) {
			console.error(e);
			setError(e);
			setRemote(null);
		} finally {
			setLoading(false);
		}
	}, [slug]);

	useEffect(() => {
		void load();
	}, [load]);

	const content = useMemo(() => buildMergedContent(remote), [remote]);

	const value = useMemo(
		() => ({
			slug,
			content,
			loading,
			error,
			reload: load,
		}),
		[slug, content, loading, error, load]
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
