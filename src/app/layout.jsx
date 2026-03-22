import './globals.css';
import { Providers } from './providers';

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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
