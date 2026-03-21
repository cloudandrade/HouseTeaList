import axios from 'axios';

/**
 * - Se `VITE_API_URL` estiver definida (ex. `http://localhost:5000`), usa diretamente.
 * - Se estiver vazia / omitida, usa `/api` → proxy do Vite para a API (ver `vite.config.js`).
 */
function resolveApiBase() {
	const raw = import.meta.env.VITE_API_URL;
	if (raw == null || String(raw).trim() === '') {
		return '/api';
	}
	return String(raw).trim().replace(/\/+$/, '');
}

const api = axios.create({
	baseURL: resolveApiBase(),
});

export default api;

export function getAll() {
	return api.get('/itens');
}

export function updateItem(obj) {
	const id = obj._id;
	const body = {
		id: obj.id,
		nome: obj.nome,
		checked: obj.checked,
	};

	return api.put(`/itens/${id}`, body);
}

export function getAppSettings() {
	return api.get('/app-settings');
}

export function verifyConfigKey(key) {
	return api.post('/admin/verify-config-key', { key });
}

export function putAppSettings(configKey, payload) {
	return api.put('/admin/app-settings', payload, {
		headers: { 'x-config-key': configKey },
	});
}

export function adminAddItem(configKey, itemLabel) {
	return api.post(
		'/admin/itens',
		{ item: itemLabel },
		{ headers: { 'x-config-key': configKey } }
	);
}

export function adminDeleteItem(configKey, mongoId) {
	return api.delete(`/admin/itens/${mongoId}`, {
		headers: { 'x-config-key': configKey },
	});
}
