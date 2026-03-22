'use client';

import { useEffect } from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import ShareToolbar from './ShareToolbar';

/**
 * Layout da página pública de um evento (hero, textos, slot para lista).
 * `content` tem a mesma forma que `useAppContent().content`.
 */
export default function EventPublicView({
	content,
	loading,
	error,
	children,
}) {
	const { theme } = content;

	useEffect(() => {
		const t = content?.documentTitle?.trim();
		document.title = t || 'Lista de Chá';
	}, [content?.documentTitle]);

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '50vh',
				}}
			>
				<CircularProgress style={{ color: theme.primary }} />
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ padding: 24, textAlign: 'center' }}>
				<Typography style={{ color: theme.text }}>
					Evento não encontrado ou indisponível. Verifica o link (identificador
					na URL).
				</Typography>
			</div>
		);
	}

	const heroSrc = content.heroImage && String(content.heroImage).trim();

	const shareTitle =
		(content?.documentTitle && String(content.documentTitle).trim()) ||
		(content?.heroTitle && String(content.heroTitle).trim()) ||
		'Lista de Chá';

	return (
		<div className="App">
			<ShareToolbar theme={theme} shareTitle={shareTitle} />
			<div className="box1">
				<Typography
					color="primary"
					style={{
						fontFamily: 'Alex Brush',
						fontSize: '38px',
						fontWeight: 'bold',
					}}
				>
					{content.heroTitle}
				</Typography>
			</div>
			{heroSrc ? (
				<div className="box1">
					<div className="child1">
						<img src={heroSrc} className="img" alt="" />
					</div>
				</div>
			) : null}
			<div className="box1">
				<Typography
					color="primary"
					style={{
						fontFamily: 'Alex Brush',
						fontSize: '32px',
						fontWeight: 'bold',
					}}
				>
					{content.listSubtitle}
				</Typography>
			</div>

			<div className="box3">
				<Typography
					style={{
						margin: '15px',
						fontFamily: 'Roboto',
						fontSize: '16px',
						fontWeight: '600',
						color: theme.text,
					}}
				>
					{content.introPrimary}
				</Typography>
				<Typography
					style={{
						margin: '12px',
						fontFamily: 'Roboto',
						fontSize: '12px',
						fontWeight: '600',
						color: theme.text,
					}}
				>
					{content.introNote}
				</Typography>
				<Typography
					style={{
						margin: '12px',
						marginTop: -10,
						fontFamily: 'Roboto',
						fontSize: '12px',
						fontWeight: '600',
						color: theme.text,
					}}
				>
					{content.introShipping}
				</Typography>
			</div>
			{children}
		</div>
	);
}
