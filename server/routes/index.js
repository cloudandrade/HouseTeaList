const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Item'); //importando o model para ser usado
const Item = mongoose.model('itens'); //passando o valor do model para uma variavel e relacionando a collection

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
			if (item) {
				//criar depois validação da edição
				item.nome = itemLista.nome;
				item.checked = itemLista.checked;

				item.save()
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
			}
		})
		.catch((erro) => {
			console.log(erro);
			res.send('houve um erro ao buscar item para ediçao: erro: ' + erro);
		});
});

module.exports = router;
