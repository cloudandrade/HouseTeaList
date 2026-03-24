const mongoose = require('mongoose');

let ensured = false;

/**
 * Esquemas antigos ou migrações podem ter deixado índice único só em `id`,
 * o que impede dois tenants de terem o mesmo id lógico ("1", "2", …).
 * O modelo correto é único por par (tenantId, id).
 */
async function ensureItemIndexes() {
	if (ensured) return;
	ensured = true;
	if (mongoose.connection.readyState !== 1) return;
	const coll = mongoose.connection.collection('itens');
	try {
		await coll.dropIndex('id_1');
	} catch (err) {
		const msg = String(err.message || err);
		if (
			err.code === 27 ||
			err.codeName === 'IndexNotFound' ||
			msg.includes('index not found') ||
			msg.includes('ns not found')
		) {
			// ok
		} else {
			console.warn(
				'[itens] Não foi possível remover índice legado id_1:',
				msg
			);
		}
	}
	try {
		await coll.createIndex({ tenantId: 1, id: 1 }, { unique: true });
	} catch (err) {
		const msg = String(err.message || err);
		console.warn('[itens] Não foi possível garantir índice tenantId+id:', msg);
	}
}

module.exports = { ensureItemIndexes };
