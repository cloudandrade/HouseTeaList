const mongoose = require('mongoose');
const { THEME_PALETTE_COUNT } = require('../config/themeConstants');
const Schema = mongoose.Schema;

const AccordionLabelsSchema = new Schema(
	{
		nameFieldLabel: String,
		signButton: String,
		signedByPrefix: String,
		nameRequiredAlert: String,
	},
	{ _id: false }
);

const AppSettingsSchema = new Schema({
	tenantId: {
		type: Schema.Types.ObjectId,
		ref: 'tenants',
		required: true,
		unique: true,
	},
	documentTitle: String,
	heroTitle: String,
	listSubtitle: String,
	introPrimary: String,
	introNote: String,
	introShipping: String,
	heroImageDataUrl: String,
	themeVariation: {
		type: Number,
		min: 1,
		max: THEME_PALETTE_COUNT,
	},
	accordion: AccordionLabelsSchema,
});

module.exports =
	mongoose.models.appsettings ||
	mongoose.model('appsettings', AppSettingsSchema);
