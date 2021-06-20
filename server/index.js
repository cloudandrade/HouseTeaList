const express = require('express');
const bodyParser = require('body-parser');
//const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const path = require('path');

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.PORT || 5000;

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES
app.use('/', require('./routes/index'));

//MONGO ONLINE
const db = require('./config/keys').MongoURI;
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => {
		console.log('AtlasDb Connected...');
	})
	.catch((err) => {
		console.log('Falha ao conectar ao AtlasDb');
		console.log(err);
	});

//MONGOOSE
/* mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/passport", { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected...");
  })
  .catch(erro => {
    console.log(
      "houve um problema ao se conectar ao banco de dados, erro: " + erro
    );
  }); */

//SERVER
app.listen(process.env.port || PORT, console.log(`Server started on port ${PORT}`));
