/**
 * APP_ENV:
 * - local — MongoDB local (ex.: Docker em localhost:27017)
 * - prod — MongoDB na nuvem (obrigatório definir MONGODB_URI)
 */
function getMongoUri() {
	const appEnv = process.env.APP_ENV || 'local';

	if (appEnv === 'prod') {
		const uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error(
				'APP_ENV=prod requer a variável MONGODB_URI (connection string do MongoDB na nuvem).'
			);
		}
		return uri;
	}

	return (
		process.env.MONGODB_URI_LOCAL || 'mongodb://127.0.0.1:27017/tealist'
	);
}

module.exports = { getMongoUri };
