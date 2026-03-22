const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	tenantId: {
		type: Schema.Types.ObjectId,
		ref: 'tenants',
		required: true,
		index: true,
	},
	id: {
		type: String,
		required: true,
	},
	item: {
		type: String,
		required: true,
	},
	nome: {
		type: String,
	},
	checked: {
		type: Boolean,
	},
});

itemSchema.index({ tenantId: 1, id: 1 }, { unique: true });

module.exports =
	mongoose.models.itens || mongoose.model('itens', itemSchema);
