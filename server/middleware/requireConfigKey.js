/**
 * Compara o header `x-config-key` com `process.env.CONFIG_ADMIN_KEY`.
 */
function requireConfigKey(req, res, next) {
	const expected = process.env.CONFIG_ADMIN_KEY;
	if (!expected || String(expected).trim() === '') {
		return res.status(503).json({
			error:
				'CONFIG_ADMIN_KEY não está definida no servidor (.env da API).',
		});
	}
	const sent = req.headers['x-config-key'];
	if (!sent || String(sent) !== String(expected)) {
		return res.status(401).json({ error: 'Chave de configuração inválida.' });
	}
	next();
}

module.exports = { requireConfigKey };
