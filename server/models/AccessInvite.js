const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Chaves pré-cadastradas pelo admin. Ao primeiro desbloqueio em /config,
 * cria-se o tenant e este documento é removido.
 */
const accessInviteSchema = new Schema(
	{
		plainKey: {
			type: String,
			required: true,
			unique: true,
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
	mongoose.models.access_invites ||
	mongoose.model('access_invites', accessInviteSchema);
