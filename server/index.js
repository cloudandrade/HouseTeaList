const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const cors = require('cors');

const { getMongoUri } = require('./config/database');

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.PORT || 5000;

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.listen(process.env.port || PORT, () =>
	console.log(`Server started on port ${PORT}`)
);
