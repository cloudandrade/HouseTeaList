const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const RESERVED = new Set([
	'api',
	'sys',
	'admin',
	'config',
	'_next',
	'favicon.ico',
	't',
	'static',
]);

function keyLookupHash(key) {
	return crypto
		.createHash('sha256')
		.update(String(key).trim(), 'utf8')
		.digest('hex');
}

function generateSlug() {
	return crypto.randomBytes(12).toString('hex');
}

/**
 * POST /api/config/unlock — desbloqueia /config: tenant existente ou cria a partir de access_invites.
 */
async function handlePostConfigUnlock(req, res) {
	const rawKey = req.body && req.body.key;
	if (!rawKey || String(rawKey).trim() === '') {
		return res.status(400).json({ error: 'Chave em falta.' });
	}
	const key = String(rawKey).trim();
	const lookup = keyLookupHash(key);

	const Tenant = mongoose.model('tenants');
	const AccessInvite = mongoose.model('access_invites');

	try {
		let tenant = await Tenant.findOne({ keyLookup: lookup }).lean();
		if (tenant) {
			const ok = await bcrypt.compare(key, tenant.accessKeyHash);
			if (!ok) {
				return res.status(401).json({ error: 'Chave inválida.' });
			}
			return res.json({
				slug: tenant.slug,
				label: tenant.label || '',
				publicUrl: `/${tenant.slug}`,
				configUrl: '/config',
				provisioned: false,
			});
		}

		const invite = await AccessInvite.findOne({ plainKey: key }).lean();
		if (!invite) {
			return res.status(401).json({
				error:
					'Chave não reconhecida. Confirma o valor ou pede ao administrador para te registar em access_invites.',
			});
		}

		const accessKeyHash = await bcrypt.hash(key, 10);
		let slug;
		let attempts = 0;
		do {
			slug = generateSlug();
			attempts += 1;
			if (attempts > 25) {
				return res.status(500).json({ error: 'Falha ao gerar identificador único.' });
			}
		} while (
			(await Tenant.findOne({ slug }).lean()) ||
			RESERVED.has(slug)
		);

		const created = await Tenant.create({
			slug,
			accessKeyHash,
			keyLookup: lookup,
			label: invite.label || '',
		});

		await AccessInvite.deleteOne({ _id: invite._id });

		return res.json({
			slug: created.slug,
			label: created.label || '',
			publicUrl: `/${created.slug}`,
			configUrl: '/config',
			provisioned: true,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Falha ao processar o desbloqueio.' });
	}
}

module.exports = { handlePostConfigUnlock, keyLookupHash };
