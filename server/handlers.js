const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Item = mongoose.model('itens');
const AppSettings = mongoose.model('appsettings');

const { mergeAppSettingsResponse } = require('./utils/mergeAppSettings');
const { THEME_PALETTE_COUNT } = require('./config/themeConstants');

function sortListaPorId(lista) {
	return [...lista].sort((a, b) => Number(a.id) - Number(b.id));
}

async function handleGetItens(req, res) {
	console.log('Buscando Lista de Itens', req.tenantId);
	try {
		const lista = await Item.find({ tenantId: req.tenantId }).lean();
		res.json(sortListaPorId(lista));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao carregar lista de itens' });
	}
}

async function handlePutIten(req, res) {
	console.log('Alterando Item');
	const itemLista = req.body;
	const id = req.query.id;

	Item.findOne({ _id: id, tenantId: req.tenantId })
		.then((item) => {
			if (!item) {
				res.status(404).send('item não encontrado');
				return;
			}
			item.nome = itemLista.nome;
			item.checked = itemLista.checked;

			item
				.save()
				.then(() => {
					res.status(200).json({
						msg: 'editado com sucesso',
						payload: item,
					});
				})
				.catch((error) => {
					console.log(error);
					res.status(500).send(
						'houve um erro ao editar item da lista: erro: ' + error
					);
				});
		})
		.catch((erro) => {
			console.log(erro);
			res.send('houve um erro ao buscar item para ediçao: erro: ' + erro);
		});
}

async function handleGetAppSettings(req, res) {
	try {
		const doc = await AppSettings.findOne({ tenantId: req.tenantId }).lean();
		res.json(mergeAppSettingsResponse(doc));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao carregar configurações' });
	}
}

async function handlePostVerifyConfigKey(req, res) {
	const key = req.body && req.body.key;
	if (!key || String(key).trim() === '') {
		return res.status(400).json({ error: 'Chave em falta.' });
	}
	try {
		const ok = await bcrypt.compare(
			String(key),
			req.tenant.accessKeyHash
		);
		if (!ok) {
			return res.status(401).json({ error: 'Chave inválida.' });
		}
		return res.json({ ok: true });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Falha ao validar chave.' });
	}
}

async function handlePutAdminAppSettings(req, res) {
	try {
		const body = req.body || {};
		const $set = { tenantId: req.tenantId };
		const textFields = [
			'heroTitle',
			'listSubtitle',
			'introPrimary',
			'introNote',
			'introShipping',
		];
		for (const f of textFields) {
			if (body[f] !== undefined) $set[f] = String(body[f]);
		}
		if (body.heroTitle !== undefined) {
			$set.documentTitle = String(body.heroTitle);
		}
		if (body.accordion && typeof body.accordion === 'object') {
			for (const k of ['nameFieldLabel', 'signButton', 'signedByPrefix']) {
				if (body.accordion[k] !== undefined) {
					$set[`accordion.${k}`] = String(body.accordion[k]);
				}
			}
		}
		const update = { $set };
		const clearImage =
			body.heroImageDataUrl === null ||
			body.heroImageDataUrl === undefined ||
			body.heroImageDataUrl === '';
		if (clearImage && body.heroImageDataUrl !== undefined) {
			update.$unset = { heroImageDataUrl: '' };
		} else if (body.heroImageDataUrl !== undefined && !clearImage) {
			$set.heroImageDataUrl = String(body.heroImageDataUrl);
		}

		if (body.themeVariation !== undefined) {
			const n = Number.parseInt(String(body.themeVariation).trim(), 10);
			if (Number.isFinite(n)) {
				$set.themeVariation = Math.min(
					THEME_PALETTE_COUNT,
					Math.max(1, n)
				);
			}
		}

		await AppSettings.findOneAndUpdate({ tenantId: req.tenantId }, update, {
			upsert: true,
			new: true,
		});
		const doc = await AppSettings.findOne({ tenantId: req.tenantId }).lean();
		res.json(mergeAppSettingsResponse(doc));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao guardar configurações' });
	}
}

async function handlePostAdminItens(req, res) {
	try {
		const label = req.body && req.body.item;
		if (!label || String(label).trim() === '') {
			return res.status(400).json({ error: 'Campo "item" é obrigatório.' });
		}
		const rows = await Item.find({ tenantId: req.tenantId }, { id: 1 }).lean();
		let max = 0;
		for (const row of rows) {
			const n = parseInt(row.id, 10);
			if (Number.isFinite(n) && n > max) max = n;
		}
		const nextId = String(max + 1);
		const created = await Item.create({
			tenantId: req.tenantId,
			id: nextId,
			item: String(label).trim(),
			nome: '',
			checked: false,
		});
		res.status(201).json(created);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao criar item' });
	}
}

async function handleDeleteAdminItem(req, res) {
	try {
		const { mongoId } = req.query;
		if (!mongoose.Types.ObjectId.isValid(mongoId)) {
			return res.status(400).json({ error: 'Id inválido.' });
		}
		const removed = await Item.findOneAndDelete({
			_id: mongoId,
			tenantId: req.tenantId,
		});
		if (!removed) {
			return res.status(404).json({ error: 'Item não encontrado.' });
		}
		res.json({ ok: true, removed });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao remover item' });
	}
}

module.exports = {
	handleGetItens,
	handlePutIten,
	handleGetAppSettings,
	handlePostVerifyConfigKey,
	handlePutAdminAppSettings,
	handlePostAdminItens,
	handleDeleteAdminItem,
};
