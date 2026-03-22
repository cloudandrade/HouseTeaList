const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
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
module.exports =
	mongoose.models.itens || mongoose.model('itens', itemSchema);
