'use client';

import Link from 'next/link';
import { useNavigationLoading } from '../context/NavigationLoadingContext';

function isModifiedClick(e) {
	return (
		e.metaKey ||
		e.ctrlKey ||
		e.shiftKey ||
		e.altKey ||
		e.button !== 0
	);
}

function isSameOriginHref(href) {
	if (typeof window === 'undefined') return true;
	if (href == null) return false;
	if (typeof href === 'object') {
		return true;
	}
	if (typeof href !== 'string') return false;
	try {
		const u = new URL(href, window.location.origin);
		return u.origin === window.location.origin;
	} catch {
		return false;
	}
}

/**
 * Link interno do Next com overlay de carregamento (rotas que o cliente precisa obter/compilar).
 * Ignora cliques com modificadores, botão não primário e `target="_blank"`.
 */
export default function AppLink({ href, onClick, children, target, ...props }) {
	const { startNavigation } = useNavigationLoading();

	const handleClick = (e) => {
		if (isModifiedClick(e)) {
			onClick?.(e);
			return;
		}
		if (target === '_blank') {
			onClick?.(e);
			return;
		}
		if (isSameOriginHref(href)) {
			startNavigation();
		}
		onClick?.(e);
	};

	return (
		<Link href={href} onClick={handleClick} target={target} {...props}>
			{children}
		</Link>
	);
}
