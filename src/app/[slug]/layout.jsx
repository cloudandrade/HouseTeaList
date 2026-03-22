import { Providers } from '../providers';

export default function SlugLayout({ children, params }) {
	const slug = params.slug;
	return <Providers slug={slug}>{children}</Providers>;
}
