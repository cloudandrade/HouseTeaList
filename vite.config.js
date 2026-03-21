import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Abre o Google Chrome em vez do browser predefinido do sistema (ex.: Edge no Windows). */
function openChromePlugin() {
	return {
		name: 'open-chrome',
		configureServer(server) {
			server.httpServer?.once('listening', () => {
				queueMicrotask(() => {
					void (async () => {
						const addr = server.httpServer?.address();
						if (!addr || typeof addr === 'string') return;
						const host =
							addr.address === '0.0.0.0' || addr.address === '::'
								? 'localhost'
								: addr.address;
						const url = `http://${host}:${addr.port}`;
						try {
							const { default: open, apps } = await import('open');
							await open(url, { app: { name: apps.chrome } });
						} catch {
							try {
								const { default: open } = await import('open');
								await open(url);
							} catch {
								/* Chrome não encontrado ou open falhou */
							}
						}
					})();
				});
			});
		},
	};
}

/** Em dev/preview, pedidos a `/api/*` vão para o Express (porta 5000). Evita “Cannot POST …” quando o browser fala com o Vite em vez da API. */
const apiProxy = {
	'/api': {
		target: 'http://127.0.0.1:5000',
		changeOrigin: true,
		rewrite: (path) => {
			const next = path.replace(/^\/api/, '');
			return next.startsWith('/') ? next : `/${next}`;
		},
	},
};

export default defineConfig({
	plugins: [react(), openChromePlugin()],
	server: {
		port: 3000,
		open: false,
		proxy: apiProxy,
	},
	preview: {
		proxy: apiProxy,
	},
});
