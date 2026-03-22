const bcrypt = require('bcryptjs');

/**
 * Compara `x-config-key` com o hash da chave do tenant em `req.tenant`.
 * Usar depois de `attachTenant`.
 */
function requireTenantAccessKey(req, res, next) {
	const sent = req.headers['x-config-key'];
	if (!sent || String(sent).trim() === '') {
		return res.status(401).json({ error: 'Chave de configuração em falta.' });
	}
	if (!req.tenant || !req.tenant.accessKeyHash) {
		return res.status(500).json({ error: 'Estado do tenant inválido.' });
	}
	bcrypt.compare(String(sent), req.tenant.accessKeyHash, (err, ok) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Falha ao validar chave.' });
		}
		if (!ok) {
			return res.status(401).json({ error: 'Chave de configuração inválida.' });
		}
		next();
	});
}

module.exports = { requireTenantAccessKey };
