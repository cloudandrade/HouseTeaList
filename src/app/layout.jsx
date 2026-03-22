import './globals.css';
import SiteFooter from '../components/SiteFooter';
import { NavigationLoadingProvider } from '../context/NavigationLoadingContext';

export const metadata = {
	title: 'Lista de Chá',
	description: 'Lista de presentes',
	manifest: '/manifest.json',
	icons: {
		icon: '/favicon.ico',
		apple: '/logo192.png',
	},
};

export const viewport = {
	themeColor: '#000000',
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt">
			<body>
				<noscript>É necessário JavaScript para executar esta aplicação.</noscript>
				<NavigationLoadingProvider>
					<div
						style={{
							minHeight: '100vh',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<main
							style={{
								flexGrow: 1,
								flexShrink: 0,
								flexBasis: 'auto',
								width: '100%',
								minHeight: 0,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{children}
						</main>
						<SiteFooter />
					</div>
				</NavigationLoadingProvider>
			</body>
		</html>
	);
}
