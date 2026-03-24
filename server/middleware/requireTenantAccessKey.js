const bcrypt = require('bcryptjs');

/**
 * Compara `x-config-key` com o hash da chave do tenant em `req.tenant`.
 * Usar depois de `attachTenant`.
 */
function requireTenantAccessKey(req, res, next) {
	return new Promise((resolve) => {
		const done = () => resolve();
		const sent = req.headers['x-config-key'];
		if (!sent || String(sent).trim() === '') {
			res.status(401).json({ error: 'Chave de configuração em falta.' });
			return done();
		}
		if (!req.tenant || !req.tenant.accessKeyHash) {
			res.status(500).json({ error: 'Estado do tenant inválido.' });
			return done();
		}
		bcrypt.compare(String(sent), req.tenant.accessKeyHash, (err, ok) => {
			if (err) {
				console.error(err);
				if (!res.headersSent) {
					res.status(500).json({ error: 'Falha ao validar chave.' });
				}
				return done();
			}
			if (!ok) {
				if (!res.headersSent) {
					res.status(401).json({ error: 'Chave de configuração inválida.' });
				}
				return done();
			}
			let result;
			try {
				result = next();
			} catch (e) {
				console.error(e);
				if (!res.headersSent) {
					res.status(500).json({ error: 'Erro interno.' });
				}
				return done();
			}
			if (result && typeof result.then === 'function') {
				result.then(done).catch((e) => {
					console.error(e);
					if (!res.headersSent) {
						res.status(500).json({ error: 'Erro interno.' });
					}
					done();
				});
			} else {
				done();
			}
		});
	});
}

module.exports = { requireTenantAccessKey };
