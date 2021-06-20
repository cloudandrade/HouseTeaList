const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
	'mongodb+srv://dbUser:dbUser@clustertea.drysx.mongodb.net/tealist?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const getAll = async () => {
	try {
		await client.connect();
		const database = client.db('tealist');
		const item = database.collection('item');
		// Query for a movie that has the title 'Back to the Future'
		const query = {};
		const itens = await item.find(query).toArray();
		return itens;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
};

module.exports = getAll;
