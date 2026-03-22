import listaInicialItens from '../../data/listaInicial.json';
import { NAME_REQUIRED_ALERT } from './systemMessages';

/** Mesma imagem que `src/img/img1.jpg`, servida em `/img1.jpg` (pasta `public`). */
const heroImage = '/img1.jpg';

/**
 * Conteúdo da página inicial de demonstração (`/`) apenas.
 * Não é usado como predefinição para tenants (GET /app-settings sem dados → campos vazios).
 * O título do separador segue o título principal (como nas páginas reais).
 */
export const DEMO_LANDING_PAGE_CONTENT = {
	themeVariation: 1,

	heroTitle: 'Nosso Chá de casa nova!',
	documentTitle: 'Nosso Chá de casa nova!',

	listSubtitle: 'Lista de X & Y',

	introPrimary:
		'Gostaríamos de humildemente pedir um apoio, vamos nos casar em ' +
		'Dezembro e iremos nos mudar para uma casa nova! Faça parte da nossa ' +
		'história, deixe sua contribuição e lembraremos sempre de você!',

	introNote:
		'Obs: Todos os presentes serão entregues em mãos até a data X.',

	introShipping:
		'Caso queiram enviar direto ao endereço: XYZ, N 999, Bairro null, cidade: undefined, cep: 00000-000. - BA',

	heroImage,

	listaInicialItens,

	accordion: {
		nameFieldLabel: 'Seu Nome',
		signButton: 'Assinar',
		signedByPrefix: 'Assinado por:',
		nameRequiredAlert: NAME_REQUIRED_ALERT,
	},
};
