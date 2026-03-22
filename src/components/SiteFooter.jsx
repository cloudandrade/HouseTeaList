'use client';

import React from 'react';
import { Box, Typography } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';

export default function SiteFooter() {
	return (
		<Box
			component="footer"
			style={{
				marginTop: 'auto',
				padding: '20px 16px 24px',
				textAlign: 'center',
				borderTop: '1px solid rgba(0, 0, 0, 0.08)',
				backgroundColor: 'rgba(255, 255, 255, 0.6)',
			}}
		>
			<Typography
				variant="body2"
				component="p"
				style={{
					margin: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexWrap: 'wrap',
					gap: 4,
					color: 'rgba(0, 0, 0, 0.65)',
				}}
			>
				<span>Desenvolvido por Jan</span>
				<CloudIcon
					style={{ fontSize: 18, opacity: 0.85, verticalAlign: 'middle' }}
					aria-hidden
				/>
				<span>Andrade.</span>
			</Typography>
			<Typography
				variant="caption"
				component="p"
				style={{
					margin: '8px 0 0',
					color: 'rgba(0, 0, 0, 0.5)',
				}}
			>
				Todos os direitos reservados
			</Typography>
		</Box>
	);
}
