import axios from 'axios';

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

function tenantBase(slug) {
	const s = encodeURIComponent(String(slug || '').trim());
	return `/t/${s}`;
}

export function getAll(slug) {
	return api.get(`${tenantBase(slug)}/itens`);
}

export function updateItem(slug, obj) {
	const id = obj._id;
	const body = {
		id: obj.id,
		nome: obj.nome,
		checked: obj.checked,
	};

	return api.put(`${tenantBase(slug)}/itens/${id}`, body);
}

export function getAppSettings(slug) {
	return api.get(`${tenantBase(slug)}/app-settings`);
}

export function verifyConfigKey(slug, key) {
	return api.post(`${tenantBase(slug)}/admin/verify-config-key`, { key });
}

/** Desbloqueia /config: valida chave existente ou provisiona tenant a partir de access_invites. */
export function unlockConfig(key) {
	return api.post('/config/unlock', { key });
}

export function putAppSettings(slug, configKey, payload) {
	return api.put(`${tenantBase(slug)}/admin/app-settings`, payload, {
		headers: { 'x-config-key': configKey },
	});
}

export function adminAddItem(slug, configKey, itemLabel) {
	return api.post(
		`${tenantBase(slug)}/admin/itens`,
		{ item: itemLabel },
		{ headers: { 'x-config-key': configKey } }
	);
}

export function adminDeleteItem(slug, configKey, mongoId) {
	return api.delete(`${tenantBase(slug)}/admin/itens/${mongoId}`, {
		headers: { 'x-config-key': configKey },
	});
}
