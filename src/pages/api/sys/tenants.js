const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const connectDB = require('../../../../lib/dbConnect');
const { requireSystemAdminKey } = require('../../../../server/middleware/requireSystemAdminKey');
const { keyLookupHash } = require('../../../../server/configUnlock');

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

function normalizeSlug(input) {
	if (input == null || String(input).trim() === '') return null;
	const s = String(input).trim().toLowerCase();
	if (RESERVED.has(s)) return null;
	if (!/^[a-z0-9][a-z0-9_-]{4,62}[a-z0-9]$/.test(s)) return null;
	return s;
}

function generateSlug() {
	return crypto.randomBytes(12).toString('hex');
}

async function handler(req, res) {
	await connectDB();
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return requireSystemAdminKey(req, res, () => void createTenant(req, res));
}

async function createTenant(req, res) {
	const mongoose = require('mongoose');
	const Tenant = mongoose.model('tenants');

	const body = req.body || {};
	const accessKey = body.accessKey;
	if (!accessKey || String(accessKey).trim() === '') {
		return res.status(400).json({ error: 'Campo accessKey é obrigatório.' });
	}

	let slug;
	if (body.slug != null && String(body.slug).trim() !== '') {
		slug = normalizeSlug(body.slug);
		if (!slug) {
			return res.status(400).json({ error: 'Slug inválido ou reservado.' });
		}
		const exists = await Tenant.findOne({ slug }).lean();
		if (exists) {
			return res.status(409).json({ error: 'Este identificador (slug) já existe.' });
		}
	} else {
		let attempts = 0;
		do {
			slug = generateSlug();
			attempts += 1;
			if (attempts > 20) {
				return res.status(500).json({ error: 'Falha ao gerar slug único.' });
			}
		} while (await Tenant.findOne({ slug }).lean());
	}

	const accessKeyHash = await bcrypt.hash(String(accessKey).trim(), 10);
	const label = body.label != null ? String(body.label).trim() : '';
	const lookup = keyLookupHash(accessKey);

	try {
		const created = await Tenant.create({
			slug,
			accessKeyHash,
			keyLookup: lookup,
			label,
		});
		return res.status(201).json({
			slug: created.slug,
			label: created.label,
			publicUrl: `/${created.slug}`,
			configUrl: '/config',
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Falha ao criar evento.' });
	}
}

export default handler;

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1mb',
		},
	},
};
