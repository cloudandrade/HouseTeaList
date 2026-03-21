/**
 * Valores por defeito da página (espelho lógico de src/config/appContent.js, sem import de imagem).
 * GET /app-settings faz merge com o documento em MongoDB.
 */
module.exports = {
	documentTitle: 'Lista de Chá',
	heroTitle: 'Nosso Chá de casa nova!',
	listSubtitle: 'Lista de Jan & Kaire',
	introPrimary:
		'Gostaríamos de humildemente pedir um apoio, vamos nos casar em ' +
		'Dezembro e iremos nos mudar para uma casa nova! Faça parte da nossa ' +
		'história, deixe sua contribuição e lembraremos sempre de você!',
	introNote:
		'Obs: Respeitando o isolamento, os que assinarem receberão em mãos uma ' +
		'lembrança e comemoraremos individualmente com o(a) amigo(a) que nos ' +
		'presentear durante essa entrega.',
	introShipping:
		'Caso queiram enviar direto ao endereço: Travessa Teodoro Sampaio, Nº ' +
		'37, Vale das Pedrinhas, Salvador - BA, 41925-790. Não esqueca de nos ' +
		'comunicar ao comprar!',
	accordion: {
		nameFieldLabel: 'Seu Nome',
		signButton: 'Assinar',
		signedByPrefix: 'Assinado por:',
		nameRequiredAlert: 'É necessário digitar um nome antes de assinar!',
	},
};
