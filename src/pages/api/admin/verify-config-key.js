const connectDB = require('../../../../lib/dbConnect');
const { handlePostVerifyConfigKey } = require('../../../../server/handlers');

export default async function handler(req, res) {
	await connectDB();
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return handlePostVerifyConfigKey(req, res);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb',
		},
	},
};
