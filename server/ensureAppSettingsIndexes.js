const mongoose = require('mongoose');

let ensured = false;

/**
 * Esquemas antigos usavam `singletonKey` com índice único; vários documentos
 * sem o campo ficam com `singletonKey: null` e violam E11000. O modelo atual
 * identifica settings por `tenantId` único — o índice em `singletonKey` deve ser removido.
 */
async function ensureAppSettingsIndexes() {
	if (ensured) return;
	ensured = true;
	if (mongoose.connection.readyState !== 1) return;
	try {
		const coll = mongoose.connection.collection('appsettings');
		await coll.dropIndex('singletonKey_1');
	} catch (err) {
		const msg = String(err.message || err);
		if (
			err.code === 27 ||
			err.codeName === 'IndexNotFound' ||
			msg.includes('index not found') ||
			msg.includes('ns not found')
		) {
			return;
		}
		console.warn(
			'[appsettings] Não foi possível remover índice legado singletonKey_1:',
			msg
		);
	}
}

module.exports = { ensureAppSettingsIndexes };
