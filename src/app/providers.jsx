'use client';

import { AppContentProvider } from '../context/AppContentContext';
import { AppDialogProvider } from '../context/AppDialogContext';
import { DynamicThemeProvider } from '../context/DynamicThemeProvider';

export function Providers({ children, slug }) {
	return (
		<AppContentProvider slug={slug}>
			<DynamicThemeProvider>
				<AppDialogProvider>{children}</AppDialogProvider>
			</DynamicThemeProvider>
		</AppContentProvider>
	);
}
