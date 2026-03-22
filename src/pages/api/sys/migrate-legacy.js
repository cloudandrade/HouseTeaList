/**
 * Migra dados antigos (itens sem tenantId, appsettings com singletonKey) para um novo tenant.
 * Executar uma vez após atualizar o esquema. Requer CONFIG_ADMIN_KEY em x-system-admin-key.
 */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../../../../lib/dbConnect');
const { requireSystemAdminKey } = require('../../../../server/middleware/requireSystemAdminKey');

async function handler(req, res) {
	await connectDB();
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return requireSystemAdminKey(req, res, () => void migrate(req, res));
}

async function migrate(req, res) {
	const Tenant = mongoose.model('tenants');
	const Item = mongoose.model('itens');
	const AppSettings = mongoose.model('appsettings');

	const body = req.body || {};
	const slug = String(body.slug || 'legacy').trim().toLowerCase();
	const accessKey = body.accessKey;
	if (!accessKey || String(accessKey).trim() === '') {
		return res.status(400).json({ error: 'accessKey é obrigatório para o novo tenant.' });
	}

	const existingTenant = await Tenant.findOne({ slug }).lean();
	if (existingTenant) {
		return res.status(409).json({ error: 'Já existe tenant com este slug.' });
	}

	const accessKeyHash = await bcrypt.hash(String(accessKey).trim(), 10);
	const tenant = await Tenant.create({
		slug,
		accessKeyHash,
		label: body.label != null ? String(body.label).trim() : 'Migrado',
	});

	const itemResult = await Item.updateMany(
		{ tenantId: { $exists: false } },
		{ $set: { tenantId: tenant._id } }
	);

	let appSettingsMigrated = false;
	const legacySettings = await AppSettings.findOne({ singletonKey: 'main' }).lean();
	if (legacySettings) {
		const { _id, singletonKey, ...rest } = legacySettings;
		await AppSettings.create({
			...rest,
			tenantId: tenant._id,
		});
		await AppSettings.deleteOne({ _id: legacySettings._id });
		appSettingsMigrated = true;
	}

	return res.json({
		ok: true,
		slug: tenant.slug,
		itemsUpdated: itemResult.modifiedCount ?? itemResult.nModified ?? 0,
		appSettingsMigrated,
		publicUrl: `/${tenant.slug}`,
	});
}

export default handler;

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1mb',
		},
	},
};
