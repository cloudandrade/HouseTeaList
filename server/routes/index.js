const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const getAll = require('../querys/getAll');

//model
require('../models/Item');
const Item = mongoose.model('item');

router.get('/', async (req, res) => {
	res.send('tea list server online');
});

//get all itens
router.get('/itens', async (req, res) => {
	let lista = await getAll();
	res.json(lista);
});

//update an iten
router.put('/itens/:id', async (req, res) => {
	res.send('test');
});

module.exports = router;
