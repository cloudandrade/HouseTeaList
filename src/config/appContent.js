import heroImage from '../img/img1.jpg';
import listaInicialItens from '../../data/listaInicial.json';

/**
 * Único ponto de configuração de textos e mídia da página.
 * Ajuste aqui títulos, nomes, parágrafos, imagem principal e lista inicial (referência/seed).
 */
export const APP_CONTENT = {
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

	/** Imagem do topo (troque o import acima ou aponte para outro ficheiro em src/img) */
	heroImage,

	/** Itens iniciais da lista (espelho dos dados de referência; o app usa a API em runtime) */
	listaInicialItens,

	accordion: {
		nameFieldLabel: 'Seu Nome',
		signButton: 'Assinar',
		signedByPrefix: 'Assinado por:',
		nameRequiredAlert: 'É necessário digitar um nome antes de assinar!',
	},
};
