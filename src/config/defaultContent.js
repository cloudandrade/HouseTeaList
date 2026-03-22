import listaInicialItens from '../../data/listaInicial.json';

/** Mesma imagem que `src/img/img1.jpg`, servida em `/img1.jpg` (pasta `public`). */
const heroImage = '/img1.jpg';

/**
 * Conteúdo estático por defeito (antes de qualquer override na base de dados).
 */
export const DEFAULT_APP_PAGE_CONTENT = {
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

	heroImage,

	listaInicialItens,

	accordion: {
		nameFieldLabel: 'Seu Nome',
		signButton: 'Assinar',
		signedByPrefix: 'Assinado por:',
		nameRequiredAlert: 'É necessário digitar um nome antes de assinar!',
	},
};
