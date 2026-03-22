const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Chaves pré-cadastradas pelo admin. No primeiro desbloqueio em /config
 * cria-se o tenant; o documento permanece na coleção (histórico / auditoria).
 * A partir daí a mesma chave autentica via `tenants.keyLookup`.
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
