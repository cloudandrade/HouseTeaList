const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Item');
require('../models/AppSettings');
const Item = mongoose.model('itens');
const AppSettings = mongoose.model('appsettings');

const { requireConfigKey } = require('../middleware/requireConfigKey');
const { mergeAppSettingsResponse } = require('../utils/mergeAppSettings');
const { THEME_PALETTE_COUNT } = require('../config/themeConstants');

const SEED_PATH = path.join(__dirname, '..', '..', 'data', 'listaInicial.json');

function normalizeSeedRows(raw) {
	return raw.map((row) => ({
		id: String(row.id),
		item: row.item,
		nome: row.nome || '',
		checked: !!row.checked,
	}));
}

function sortListaPorId(lista) {
	return [...lista].sort((a, b) => Number(a.id) - Number(b.id));
}

router.get('/', async (req, res) => {
	res.send('tea list server online');
});

//get all itens
router.get('/itens', async (req, res) => {
	console.log('Buscando Lista de Itens');
	try {
		let lista = await Item.find({}).lean();

		if (lista.length === 0) {
			const raw = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));
			const docs = normalizeSeedRows(raw);
			try {
				await Item.insertMany(docs);
				console.log('Lista vazia: seed aplicado a partir de data/listaInicial.json');
			} catch (err) {
				// Corrida entre pedidos paralelos ou índice único em `id`
				console.log('Seed (possível corrida ou duplicado):', err.message);
			}
			lista = await Item.find({}).lean();
		}

		res.json(sortListaPorId(lista));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao carregar lista de itens' });
	}
});

//update an iten
router.put('/itens/:id', async (req, res) => {
	console.log('Alterando Item');
	const itemLista = req.body;
	const id = req.params.id;

	console.log('Id Enviado: ');
	console.log(id);
	console.log('Objeto Enviado: ');
	console.log(itemLista);

	Item.findOne({ _id: id })
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
});

/** Configuração pública da página (textos + opcional imagem base64); merge com defaults no servidor. */
router.get('/app-settings', async (req, res) => {
	try {
		const doc = await AppSettings.findOne({ singletonKey: 'main' }).lean();
		res.json(mergeAppSettingsResponse(doc));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao carregar configurações' });
	}
});

/** Valida a chave antes de mostrar o painel (corpo JSON). */
router.post('/admin/verify-config-key', (req, res) => {
	const expected = process.env.CONFIG_ADMIN_KEY;
	if (!expected || String(expected).trim() === '') {
		return res.status(503).json({
			error:
				'CONFIG_ADMIN_KEY não está definida no servidor (.env da API).',
		});
	}
	const key = req.body && req.body.key;
	if (!key || String(key) !== String(expected)) {
		return res.status(401).json({ error: 'Chave inválida.' });
	}
	return res.json({ ok: true });
});

router.put('/admin/app-settings', requireConfigKey, async (req, res) => {
	try {
		const body = req.body || {};
		const $set = { singletonKey: 'main' };
		const textFields = [
			'documentTitle',
			'heroTitle',
			'listSubtitle',
			'introPrimary',
			'introNote',
			'introShipping',
		];
		for (const f of textFields) {
			if (body[f] !== undefined) $set[f] = String(body[f]);
		}
		if (body.accordion && typeof body.accordion === 'object') {
			for (const k of [
				'nameFieldLabel',
				'signButton',
				'signedByPrefix',
				'nameRequiredAlert',
			]) {
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
		} else if (
			body.heroImageDataUrl !== undefined &&
			!clearImage
		) {
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

		await AppSettings.findOneAndUpdate({ singletonKey: 'main' }, update, {
			upsert: true,
			new: true,
		});
		const doc = await AppSettings.findOne({ singletonKey: 'main' }).lean();
		res.json(mergeAppSettingsResponse(doc));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao guardar configurações' });
	}
});

router.post('/admin/itens', requireConfigKey, async (req, res) => {
	try {
		const label = req.body && req.body.item;
		if (!label || String(label).trim() === '') {
			return res.status(400).json({ error: 'Campo "item" é obrigatório.' });
		}
		const rows = await Item.find({}, { id: 1 }).lean();
		let max = 0;
		for (const row of rows) {
			const n = parseInt(row.id, 10);
			if (Number.isFinite(n) && n > max) max = n;
		}
		const nextId = String(max + 1);
		const created = await Item.create({
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
});

router.delete('/admin/itens/:mongoId', requireConfigKey, async (req, res) => {
	try {
		const { mongoId } = req.params;
		if (!mongoose.Types.ObjectId.isValid(mongoId)) {
			return res.status(400).json({ error: 'Id inválido.' });
		}
		const removed = await Item.findByIdAndDelete(mongoId);
		if (!removed) {
			return res.status(404).json({ error: 'Item não encontrado.' });
		}
		res.json({ ok: true, removed });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Falha ao remover item' });
	}
});

module.exports = router;
