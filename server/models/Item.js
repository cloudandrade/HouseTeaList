const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
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
mongoose.model('item', Item);
