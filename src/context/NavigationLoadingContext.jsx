'use client';

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CircularProgress } from '@material-ui/core';

const NavigationLoadingContext = createContext(null);

const NAVIGATION_TIMEOUT_MS = 15000;

export function NavigationLoadingProvider({ children }) {
	const pathname = usePathname();
	const [pending, setPending] = useState(false);

	useEffect(() => {
		setPending(false);
	}, [pathname]);

	useEffect(() => {
		if (!pending) return undefined;
		const t = window.setTimeout(
			() => setPending(false),
			NAVIGATION_TIMEOUT_MS
		);
		return () => window.clearTimeout(t);
	}, [pending]);

	const startNavigation = useCallback(() => {
		setPending(true);
	}, []);

	const value = useMemo(
		() => ({ startNavigation }),
		[startNavigation]
	);

	return (
		<NavigationLoadingContext.Provider value={value}>
			{children}
			{pending ? (
				<div
					role="progressbar"
					aria-busy="true"
					aria-label="A carregar página"
					style={{
						position: 'fixed',
						inset: 0,
						zIndex: 10000,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(255, 255, 255, 0.75)',
						pointerEvents: 'auto',
					}}
				>
					<CircularProgress color="primary" />
				</div>
			) : null}
		</NavigationLoadingContext.Provider>
	);
}

export function useNavigationLoading() {
	const ctx = useContext(NavigationLoadingContext);
	if (!ctx) {
		throw new Error(
			'useNavigationLoading deve ser usado dentro de NavigationLoadingProvider.'
		);
	}
	return ctx;
}

/**
 * Navegação com feedback de loading (router.push + overlay até a rota mudar).
 */
export function useAppNavigate() {
	const router = useRouter();
	const { startNavigation } = useNavigationLoading();
	return useCallback(
		(href) => {
			startNavigation();
			router.push(href);
		},
		[router, startNavigation]
	);
}
