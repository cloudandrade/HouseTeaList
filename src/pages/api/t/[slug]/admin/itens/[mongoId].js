const connectDB = require('../../../../../../../lib/dbConnect');
const { attachTenant } = require('../../../../../../../server/attachTenant');
const { requireTenantAccessKey } = require('../../../../../../../server/middleware/requireTenantAccessKey');
const { handleDeleteAdminItem } = require('../../../../../../../server/handlers');

export default async function handler(req, res) {
	await connectDB();
	const ok = await attachTenant(req, res);
	if (!ok) return;
	if (req.method !== 'DELETE') {
		res.setHeader('Allow', ['DELETE']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return requireTenantAccessKey(req, res, () =>
		handleDeleteAdminItem(req, res)
	);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb',
		},
	},
};
