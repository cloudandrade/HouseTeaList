'use client';

import { AppContentProvider } from '../context/AppContentContext';
import { DynamicThemeProvider } from '../context/DynamicThemeProvider';

export function Providers({ children }) {
	return (
		<AppContentProvider>
			<DynamicThemeProvider>{children}</DynamicThemeProvider>
		</AppContentProvider>
	);
}
