const mongoose = require('mongoose');

/**
 * Preenche `req.tenantId` e `req.tenant` a partir de `req.query.slug`.
 * @returns {Promise<boolean>} true se ok; já enviou resposta HTTP se false.
 */
async function attachTenant(req, res) {
	const slug = req.query.slug;
	if (!slug || typeof slug !== 'string' || String(slug).trim() === '') {
		res.status(400).json({ error: 'Identificador (slug) em falta.' });
		return false;
	}
	const normalized = String(slug).trim().toLowerCase();
	const Tenant = mongoose.model('tenants');
	const tenant = await Tenant.findOne({ slug: normalized }).lean();
	if (!tenant) {
		res.status(404).json({ error: 'Evento não encontrado.' });
		return false;
	}
	req.tenantId = tenant._id;
	req.tenant = tenant;
	return true;
}

module.exports = { attachTenant };
