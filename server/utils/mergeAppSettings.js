const { THEME_PALETTE_COUNT } = require('../config/themeConstants');
const { NAME_REQUIRED_ALERT } = require('../config/systemMessages');

function clampThemeVariation(value) {
	const n = Number.parseInt(String(value ?? '').trim(), 10);
	if (!Number.isFinite(n)) return 1;
	return Math.min(THEME_PALETTE_COUNT, Math.max(1, n));
}

function pickStr(val) {
	return val != null && String(val).trim() !== '' ? String(val).trim() : '';
}

function mergeAccordionFromDoc(acc) {
	const a = acc && typeof acc === 'object' ? acc : {};
	return {
		nameFieldLabel: pickStr(a.nameFieldLabel),
		signButton: pickStr(a.signButton),
		signedByPrefix: pickStr(a.signedByPrefix),
		nameRequiredAlert: NAME_REQUIRED_ALERT,
	};
}

/**
 * `document.title` segue sempre o título principal (hero); mensagem de nome obrigatório é global.
 * @param {import('mongoose').Document | Record<string, unknown> | null | undefined} doc
 */
function mergeAppSettingsResponse(doc) {
	const d = doc && doc.toObject ? doc.toObject() : doc || {};
	const hero = pickStr(d.heroTitle);
	return {
		documentTitle: hero || 'Lista de Chá',
		heroTitle: hero,
		listSubtitle: pickStr(d.listSubtitle),
		introPrimary: pickStr(d.introPrimary),
		introNote: pickStr(d.introNote),
		introShipping: pickStr(d.introShipping),
		accordion: mergeAccordionFromDoc(d.accordion),
		heroImageDataUrl:
			d.heroImageDataUrl != null && String(d.heroImageDataUrl).trim() !== ''
				? String(d.heroImageDataUrl).trim()
				: null,
		themeVariation: clampThemeVariation(
			d.themeVariation != null ? d.themeVariation : 1
		),
	};
}

module.exports = { mergeAppSettingsResponse };
