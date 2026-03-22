const connectDB = require('../../../../lib/dbConnect');
const {
	requireConfigKey,
	handlePutAdminAppSettings,
} = require('../../../../server/handlers');

export default async function handler(req, res) {
	await connectDB();
	if (req.method !== 'PUT') {
		res.setHeader('Allow', ['PUT']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return requireConfigKey(req, res, () => {
		void handlePutAdminAppSettings(req, res);
	});
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb',
		},
	},
};
