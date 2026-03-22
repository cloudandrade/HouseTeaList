const mongoose = require('mongoose');
const { getMongoUri } = require('../server/config/database');

require('../server/models/Tenant');
require('../server/models/AccessInvite');
require('../server/models/Item');
require('../server/models/AppSettings');

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
			})
			.then((m) => m);
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

module.exports = connectDB;
