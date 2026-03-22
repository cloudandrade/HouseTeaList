import axios from 'axios';

/**
 * - Se `NEXT_PUBLIC_API_URL` estiver definida (ex. `http://localhost:3000`), usa diretamente.
 * - Se estiver vazia / omitida, usa `/api` (rotas API do Next na mesma origem).
 */
function resolveApiBase() {
	const raw =
		typeof process !== 'undefined' && process.env
			? process.env.NEXT_PUBLIC_API_URL
			: undefined;
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
