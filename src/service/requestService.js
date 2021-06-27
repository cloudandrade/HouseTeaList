import axios from 'axios';
const APIPORT = '5000';
const URLAPI = `http://localhost:${APIPORT}`;

const api = axios.create({
	baseURL: URLAPI,
});

export default api;

export function getAll() {
	return api.get('itens');
}

export function updateItem(body) {
	return api.put(`itens/${body.id}`, { body });
}

/* import API from './axiosAPI';

export  function getAll() {
	try {
		return await API.get(`itens`).then((result) => {
			return result.data;
		});
	} catch (error) {
		console.log(error);
	}
}

export async function updateItem(body) {
	try {
		return await API.put(`itens/${body.id}`, { body });
	} catch (error) {
		console.log(error);
	}
} */
