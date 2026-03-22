/**
 * Cabeçalho `x-system-admin-key` deve coincidir com `CONFIG_ADMIN_KEY` (admin da plataforma).
 */
function requireSystemAdminKey(req, res, next) {
	const expected = process.env.CONFIG_ADMIN_KEY;
	if (!expected || String(expected).trim() === '') {
		return res.status(503).json({
			error:
				'CONFIG_ADMIN_KEY não está definida no servidor (.env / .env.local).',
		});
	}
	const sent = req.headers['x-system-admin-key'];
	if (!sent || String(sent) !== String(expected)) {
		return res.status(401).json({ error: 'Chave de administrador inválida.' });
	}
	next();
}

module.exports = { requireSystemAdminKey };
