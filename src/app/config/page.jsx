'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import { Providers } from '../providers';
import {
	ConfigAdminPanel,
	CONFIG_SESSION_STORAGE_KEY,
} from '../../components/ConfigAdminPanel';
import { unlockConfig } from '../../service/requestService';

export default function ConfigPage() {
	const [phase, setPhase] = useState('checking');
	const [keyInput, setKeyInput] = useState('');
	const [keyError, setKeyError] = useState('');
	const [busy, setBusy] = useState(false);
	const [slug, setSlug] = useState(null);
	const [unlockMeta, setUnlockMeta] = useState(null);

	useEffect(() => {
		try {
			const raw = sessionStorage.getItem(CONFIG_SESSION_STORAGE_KEY);
			if (!raw) {
				setPhase('key');
				return;
			}
			const p = JSON.parse(raw);
			if (p.slug && p.key) {
				setSlug(String(p.slug));
				setPhase('panel');
			} else {
				setPhase('key');
			}
		} catch {
			setPhase('key');
		}
	}, []);

	const handleUnlock = async (e) => {
		e.preventDefault();
		setKeyError('');
		const trimmed = keyInput.trim();
		if (!trimmed) {
			setKeyError('Introduz a chave de acesso.');
			return;
		}
		setBusy(true);
		try {
			const { data } = await unlockConfig(trimmed);
			sessionStorage.setItem(
				CONFIG_SESSION_STORAGE_KEY,
				JSON.stringify({ slug: data.slug, key: trimmed })
			);
			setSlug(data.slug);
			setUnlockMeta({
				provisioned: Boolean(data.provisioned),
				label: data.label || '',
				publicUrl: data.publicUrl || `/${data.slug}`,
				configUrl: data.configUrl || '/config',
			});
			setPhase('panel');
		} catch (err) {
			setKeyError(
				err.response?.data?.error ||
					'Chave inválida ou erro de servidor.'
			);
		} finally {
			setBusy(false);
		}
	};

	const handleLogout = useCallback(() => {
		sessionStorage.removeItem(CONFIG_SESSION_STORAGE_KEY);
		setSlug(null);
		setUnlockMeta(null);
		setKeyInput('');
		setPhase('key');
	}, []);

	if (phase === 'checking') {
		return (
			<Box
				style={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (phase === 'key') {
		return (
			<Box
				style={{
					minHeight: '100vh',
					padding: 24,
					backgroundColor: '#fafafa',
				}}
			>
				<Box style={{ maxWidth: 480, margin: '0 auto' }}>
					<Typography variant="h5" gutterBottom>
						Configuração
					</Typography>
					<Typography variant="body2" color="textSecondary" paragraph>
						Introduz a <strong>chave de acesso</strong> que te foi atribuída. Se for a
						primeira vez com um convite válido, a tua página é criada automaticamente.
					</Typography>
					<Paper style={{ padding: 24 }}>
						<form onSubmit={handleUnlock}>
							<TextField
								fullWidth
								type="password"
								label="Chave de autorização"
								value={keyInput}
								onChange={(e) => setKeyInput(e.target.value)}
								variant="outlined"
								margin="normal"
								autoComplete="off"
							/>
							{keyError && (
								<Typography color="error" variant="body2" style={{ marginTop: 8 }}>
									{keyError}
								</Typography>
							)}
							<Box mt={2}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={busy}
								>
									{busy ? (
										<CircularProgress size={22} color="inherit" />
									) : (
										'Continuar'
									)}
								</Button>
							</Box>
						</form>
					</Paper>
				</Box>
			</Box>
		);
	}

	const origin =
		typeof window !== 'undefined' ? window.location.origin : '';
	const publicHref = slug ? `${origin}/${slug}` : '';

	return (
		<Providers slug={slug}>
			<Box style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
				{unlockMeta?.provisioned && (
					<Paper style={{ padding: 16, marginBottom: 16, background: '#e8f5e9' }}>
						<Typography variant="subtitle1" gutterBottom>
							Página criada
						</Typography>
						<Typography variant="body2">
							A tua lista foi criada automaticamente. Guarda o identificador e o link
							abaixo.
						</Typography>
					</Paper>
				)}
				<Paper style={{ padding: 16, marginBottom: 16 }}>
					<Typography variant="subtitle2" gutterBottom>
						Endereço da tua lista
					</Typography>
					<Typography variant="body2" component="div" gutterBottom>
						Identificador (slug):{' '}
						<Typography component="code" variant="body2">
							{slug}
						</Typography>
					</Typography>
					{unlockMeta?.label ? (
						<Typography variant="body2" color="textSecondary" gutterBottom>
							{unlockMeta.label}
						</Typography>
					) : null}
					<Typography variant="body2">
						Página pública:{' '}
						<a href={publicHref} target="_blank" rel="noreferrer">
							{publicHref}
						</a>
					</Typography>
					<Typography variant="body2" style={{ marginTop: 8 }}>
						Configuração (esta tela):{' '}
						<a href={`${origin}${unlockMeta?.configUrl || '/config'}`}>
							{`${origin}${unlockMeta?.configUrl || '/config'}`}
						</a>
					</Typography>
				</Paper>
			</Box>
			<ConfigAdminPanel onLogout={handleLogout} />
		</Providers>
	);
}
