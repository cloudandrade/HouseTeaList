const connectDB = require('../../../../../../lib/dbConnect');
const { attachTenant } = require('../../../../../../server/attachTenant');
const { requireTenantAccessKey } = require('../../../../../../server/middleware/requireTenantAccessKey');
const { handlePutAdminAppSettings } = require('../../../../../../server/handlers');

export default async function handler(req, res) {
	await connectDB();
	const ok = await attachTenant(req, res);
	if (!ok) return;
	if (req.method !== 'PUT') {
		res.setHeader('Allow', ['PUT']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return new Promise((resolve) => {
		res.once('finish', resolve);
		requireTenantAccessKey(req, res, () => {
			handlePutAdminAppSettings(req, res);
		});
	});
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb',
		},
	},
};
