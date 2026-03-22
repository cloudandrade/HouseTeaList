'use client';

import { AppContentProvider } from '../context/AppContentContext';
import { DynamicThemeProvider } from '../context/DynamicThemeProvider';

export function Providers({ children, slug }) {
	return (
		<AppContentProvider slug={slug}>
			<DynamicThemeProvider>{children}</DynamicThemeProvider>
		</AppContentProvider>
	);
}
