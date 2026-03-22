const connectDB = require('../../../../lib/dbConnect');
const { handlePostConfigUnlock } = require('../../../../server/configUnlock');

export default async function handler(req, res) {
	await connectDB();
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return handlePostConfigUnlock(req, res);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1mb',
		},
	},
};
