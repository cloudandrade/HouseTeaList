'use client';

import Lista from '../../components/Accordion';
import EventPublicView from '../../components/EventPublicView';
import { useAppContent } from '../../context/AppContentContext';

export default function EventHomePage() {
	const { content, loading, error } = useAppContent();

	return (
		<EventPublicView content={content} loading={loading} error={error}>
			<Lista />
		</EventPublicView>
	);
}
