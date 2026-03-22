const connectDB = require('../../../lib/dbConnect');
const { handleGetAppSettings } = require('../../../server/handlers');

export default async function handler(req, res) {
	await connectDB();
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return handleGetAppSettings(req, res);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb',
		},
	},
};
