const defaults = require('../config/defaultAppContent');
const { THEME_PALETTE_COUNT } = require('../config/themeConstants');

function clampThemeVariation(value) {
	const n = Number.parseInt(String(value ?? '').trim(), 10);
	if (!Number.isFinite(n)) return 1;
	return Math.min(THEME_PALETTE_COUNT, Math.max(1, n));
}

function pickDefinedAccordion(acc) {
	if (!acc || typeof acc !== 'object') return {};
	const out = {};
	for (const k of [
		'nameFieldLabel',
		'signButton',
		'signedByPrefix',
		'nameRequiredAlert',
	]) {
		if (acc[k] != null && String(acc[k]).trim() !== '') out[k] = String(acc[k]).trim();
	}
	return out;
}

/**
 * @param {import('mongoose').Document | Record<string, unknown> | null | undefined} doc
 */
function mergeAppSettingsResponse(doc) {
	const d = doc && doc.toObject ? doc.toObject() : doc || {};
	const merged = {
		documentTitle:
			d.documentTitle != null && String(d.documentTitle).trim() !== ''
				? String(d.documentTitle).trim()
				: defaults.documentTitle,
		heroTitle:
			d.heroTitle != null && String(d.heroTitle).trim() !== ''
				? String(d.heroTitle).trim()
				: defaults.heroTitle,
		listSubtitle:
			d.listSubtitle != null && String(d.listSubtitle).trim() !== ''
				? String(d.listSubtitle).trim()
				: defaults.listSubtitle,
		introPrimary:
			d.introPrimary != null && String(d.introPrimary).trim() !== ''
				? String(d.introPrimary).trim()
				: defaults.introPrimary,
		introNote:
			d.introNote != null && String(d.introNote).trim() !== ''
				? String(d.introNote).trim()
				: defaults.introNote,
		introShipping:
			d.introShipping != null && String(d.introShipping).trim() !== ''
				? String(d.introShipping).trim()
				: defaults.introShipping,
		accordion: {
			...defaults.accordion,
			...pickDefinedAccordion(d.accordion),
		},
		heroImageDataUrl:
			d.heroImageDataUrl != null && String(d.heroImageDataUrl).trim() !== ''
				? String(d.heroImageDataUrl).trim()
				: null,
		themeVariation: clampThemeVariation(
			d.themeVariation != null ? d.themeVariation : 1
		),
	};
	return merged;
}

module.exports = { mergeAppSettingsResponse, defaults };
