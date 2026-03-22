const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantSchema = new Schema(
	{
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			match: /^[a-z0-9][a-z0-9_-]{4,62}[a-z0-9]$/,
		},
		accessKeyHash: {
			type: String,
			required: true,
		},
		/** SHA-256 da chave em hex (lookup sem expor a chave). */
		keyLookup: {
			type: String,
			unique: true,
			sparse: true,
			trim: true,
		},
		label: {
			type: String,
			default: '',
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.tenants || mongoose.model('tenants', tenantSchema);
