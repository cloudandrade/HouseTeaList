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
	singletonKey: {
		type: String,
		required: true,
		unique: true,
		default: 'main',
	},
	documentTitle: String,
	heroTitle: String,
	listSubtitle: String,
	introPrimary: String,
	introNote: String,
	introShipping: String,
	/** data:image/...;base64,... — opcional; se vazio, o cliente usa a imagem estática */
	heroImageDataUrl: String,
	/** Paleta 1…30 (ver `themes.md` / `themePalettes.js` no front). */
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
