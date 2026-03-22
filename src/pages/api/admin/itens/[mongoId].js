const connectDB = require('../../../../../lib/dbConnect');
const {
	requireConfigKey,
	handleDeleteAdminItem,
} = require('../../../../../server/handlers');

export default async function handler(req, res) {
	await connectDB();
	if (req.method !== 'DELETE') {
		res.setHeader('Allow', ['DELETE']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	return requireConfigKey(req, res, () => {
		void handleDeleteAdminItem(req, res);
	});
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb',
		},
	},
};
