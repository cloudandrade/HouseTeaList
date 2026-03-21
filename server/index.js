const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

const { getMongoUri } = require('./config/database');

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.PORT || 5000;

const BODY_LIMIT = '15mb';
app.use(express.json({ limit: BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: BODY_LIMIT }));

app.use(cors());

//ROUTES
app.use('/', require('./routes/index'));

const db = getMongoUri();
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => {
		console.log(`MongoDB conectado (${process.env.APP_ENV || 'local'})`);
	})
	.catch((err) => {
		console.log('Falha ao conectar ao MongoDB');
		console.log(err);
	});

//SERVER
const listenPort = process.env.PORT || PORT;
app.listen(listenPort, () => {
	console.log(`Server started on port ${listenPort}`);
	console.log(
		'Rotas: GET /itens, GET /app-settings, POST /admin/verify-config-key, PUT /admin/app-settings, POST/DELETE /admin/itens'
	);
});
