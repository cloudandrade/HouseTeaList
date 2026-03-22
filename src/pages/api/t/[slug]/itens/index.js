const connectDB = require('../../../../../../lib/dbConnect');
const { attachTenant } = require('../../../../../../server/attachTenant');
const { handleGetItens } = require('../../../../../../server/handlers');

export default async function handler(req, res) {
	await connectDB();
	const ok = await attachTenant(req, res);
	if (!ok) return;
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return handleGetItens(req, res);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb',
		},
	},
};
