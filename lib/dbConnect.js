const mongoose = require('mongoose');
const { getMongoUri } = require('../server/config/database');

require('../server/models/Tenant');
require('../server/models/AccessInvite');
require('../server/models/Item');
require('../server/models/AppSettings');
const { ensureAppSettingsIndexes } = require('../server/ensureAppSettingsIndexes');
const { ensureItemIndexes } = require('../server/ensureItemIndexes');

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Ligação MongoDB reutilizável (adequada a dev e a ambientes serverless).
 */
async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		const uri = getMongoUri();
		cached.promise = mongoose
			.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			})
			.then((m) => m);
	}
	cached.conn = await cached.promise;
	await ensureAppSettingsIndexes();
	await ensureItemIndexes();
	return cached.conn;
}

module.exports = connectDB;
