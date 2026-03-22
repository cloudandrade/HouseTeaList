import { redirect } from 'next/navigation';

/** A configuração passou a ser só em `/config` (chave + sessão). */
export default function LegacySlugConfigRedirect() {
	redirect('/config');
}
