import './globals.css';
import SiteFooter from '../components/SiteFooter';

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
				<div
					style={{
						minHeight: '100vh',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<div style={{ flex: 1 }}>{children}</div>
					<SiteFooter />
				</div>
			</body>
		</html>
	);
}
