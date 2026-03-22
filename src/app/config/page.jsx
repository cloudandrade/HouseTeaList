'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
	Button,
	CircularProgress,
	TextField,
	Typography,
	Paper,
	Box,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	ListItemText,
	Divider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
	THEME_PALETTES,
	getThemeSelectOptionLabel,
} from '../../config/themePalettes';
import { useAppContent } from '../../context/AppContentContext';
import {
	getAll,
	getAppSettings,
	verifyConfigKey,
	putAppSettings,
	adminAddItem,
	adminDeleteItem,
} from '../../service/requestService';

const SESSION_KEY = 'housetealist_config_key';
const MIN_ITEM_QTY = 1;
const MAX_ITEM_QTY = 99;

export default function ConfigAdminPage() {
	const { content } = useAppContent();
	const t = content.theme;

	const [phase, setPhase] = useState('key'); // key | panel
	const [configKey, setConfigKey] = useState('');
	const [keyError, setKeyError] = useState('');
	const [busy, setBusy] = useState(false);

	const [form, setForm] = useState(null);
	const [lista, setLista] = useState([]);
	const [newItemLabel, setNewItemLabel] = useState('');
	const [newItemQuantity, setNewItemQuantity] = useState(MIN_ITEM_QTY);
	const [imagePreview, setImagePreview] = useState(null);
	const [clearCustomImage, setClearCustomImage] = useState(false);
	const [saveMsg, setSaveMsg] = useState('');
	const [showConfigKey, setShowConfigKey] = useState(false);

	const goToHomeFresh = () => {
		window.location.assign('/');
	};

	useEffect(() => {
		const fromStorage = sessionStorage.getItem(SESSION_KEY) || '';
		if (fromStorage) setConfigKey(fromStorage);
	}, []);

	useEffect(() => {
		const stored = sessionStorage.getItem(SESSION_KEY);
		if (!stored) return;
		setBusy(true);
		verifyConfigKey(stored)
			.then(() => {
				setConfigKey(stored);
				setPhase('panel');
			})
			.catch(() => {
				sessionStorage.removeItem(SESSION_KEY);
			})
			.finally(() => setBusy(false));
	}, []);

	const loadPanelData = useCallback(async () => {
		const [{ data: settings }, itemsRes] = await Promise.all([
			getAppSettings(),
			getAll(),
		]);
		setForm({
			documentTitle: settings.documentTitle,
			heroTitle: settings.heroTitle,
			listSubtitle: settings.listSubtitle,
			introPrimary: settings.introPrimary,
			introNote: settings.introNote,
			introShipping: settings.introShipping,
			themeVariation: Number(settings.themeVariation) || 1,
			accordion: { ...settings.accordion },
			heroImageDataUrl: settings.heroImageDataUrl || '',
		});
		setImagePreview(
			settings.heroImageDataUrl && settings.heroImageDataUrl.trim() !== ''
				? settings.heroImageDataUrl
				: null
		);
		setClearCustomImage(false);
		setLista(itemsRes.data || []);
	}, []);

	useEffect(() => {
		if (phase !== 'panel') return;
		setBusy(true);
		loadPanelData()
			.catch((e) => {
				console.error(e);
				setKeyError('Falha ao carregar dados.');
			})
			.finally(() => setBusy(false));
	}, [phase, loadPanelData]);

	const handleVerifyKey = async (e) => {
		e.preventDefault();
		setKeyError('');
		setBusy(true);
		try {
			await verifyConfigKey(configKey.trim());
			sessionStorage.setItem(SESSION_KEY, configKey.trim());
			setPhase('panel');
		} catch (err) {
			const msg =
				err.response?.data?.error ||
				'Não foi possível validar a chave. Verifica a API e o .env.';
			setKeyError(msg);
		} finally {
			setBusy(false);
		}
	};

	const handleLogout = () => {
		sessionStorage.removeItem(SESSION_KEY);
		setConfigKey('');
		setPhase('key');
		setForm(null);
	};

	const updateField = (field, value) => {
		setForm((f) => (f ? { ...f, [field]: value } : f));
	};

	const updateAccordion = (field, value) => {
		setForm((f) =>
			f
				? {
						...f,
						accordion: { ...f.accordion, [field]: value },
					}
				: f
		);
	};

	const handleImageFile = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const dataUrl = reader.result;
			setForm((f) =>
				f ? { ...f, heroImageDataUrl: dataUrl } : f
			);
			setImagePreview(dataUrl);
			setClearCustomImage(false);
		};
		reader.readAsDataURL(file);
	};

	const handleSaveSettings = async (e) => {
		e.preventDefault();
		const k = sessionStorage.getItem(SESSION_KEY);
		if (!k || !form) return;
		setSaveMsg('');
		setBusy(true);
		try {
			const payload = {
				documentTitle: form.documentTitle,
				heroTitle: form.heroTitle,
				listSubtitle: form.listSubtitle,
				introPrimary: form.introPrimary,
				introNote: form.introNote,
				introShipping: form.introShipping,
				themeVariation: form.themeVariation,
				accordion: form.accordion,
			};
			if (clearCustomImage) {
				payload.heroImageDataUrl = '';
			} else if (
				form.heroImageDataUrl &&
				form.heroImageDataUrl.trim() !== ''
			) {
				payload.heroImageDataUrl = form.heroImageDataUrl;
			}
			await putAppSettings(k, payload);
			setSaveMsg('Configurações guardadas.');
			await loadPanelData();
		} catch (err) {
			setSaveMsg(
				err.response?.data?.error ||
					'Erro ao guardar (chave ou servidor).'
			);
		} finally {
			setBusy(false);
		}
	};

	const handleAddItem = async () => {
		const k = sessionStorage.getItem(SESSION_KEY);
		if (!k || !newItemLabel.trim()) return;
		const qty = Math.min(
			MAX_ITEM_QTY,
			Math.max(MIN_ITEM_QTY, Math.floor(newItemQuantity))
		);
		const label = newItemLabel.trim();
		setBusy(true);
		try {
			for (let i = 0; i < qty; i++) {
				await adminAddItem(k, label);
			}
			setNewItemLabel('');
			setNewItemQuantity(MIN_ITEM_QTY);
			const { data } = await getAll();
			setLista(data || []);
		} catch (err) {
			setKeyError(
				err.response?.data?.error || 'Erro ao adicionar item.'
			);
		} finally {
			setBusy(false);
		}
	};

	const bumpQuantity = (delta) => {
		setNewItemQuantity((q) => {
			const n = Math.floor(Number(q) || MIN_ITEM_QTY);
			return Math.min(MAX_ITEM_QTY, Math.max(MIN_ITEM_QTY, n + delta));
		});
	};

	const handleRemoveItem = async (mongoId) => {
		const k = sessionStorage.getItem(SESSION_KEY);
		if (!k) return;
		setBusy(true);
		try {
			await adminDeleteItem(k, mongoId);
			const { data } = await getAll();
			setLista(data || []);
		} catch (err) {
			setKeyError(
				err.response?.data?.error || 'Erro ao remover item.'
			);
		} finally {
			setBusy(false);
		}
	};

	return (
		<Box
			style={{
				minHeight: '100vh',
				padding: 16,
				backgroundColor: t.backgroundB,
			}}
		>
			<Box
				style={{
					maxWidth: 640,
					margin: '0 auto',
				}}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography variant="h5" style={{ color: t.text }}>
						Configuração da página
					</Typography>
					<Button color="primary" onClick={goToHomeFresh}>
						Voltar ao site
					</Button>
				</Box>

				{phase === 'key' && (
					<Paper style={{ padding: 24 }}>
						<Typography
							variant="body2"
							style={{ marginBottom: 16, color: t.text }}
						>
							Introduz a chave definida em{' '}
							<code>CONFIG_ADMIN_KEY</code> no projeto (ficheiro{' '}
							<code>.env.local</code> na raiz). Sem chave correta, a API não
							aceita alterações.
						</Typography>
						<form onSubmit={handleVerifyKey}>
							<TextField
								fullWidth
								type={showConfigKey ? 'text' : 'password'}
								label="Chave de autorização"
								value={configKey}
								onChange={(e) => setConfigKey(e.target.value)}
								variant="outlined"
								margin="normal"
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												type="button"
												edge="end"
												aria-label={
													showConfigKey
														? 'Esconder caracteres'
														: 'Revelar caracteres'
												}
												onClick={() =>
													setShowConfigKey((v) => !v)
												}
											>
												{showConfigKey ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							{keyError && (
								<Typography color="error" variant="body2">
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
										'Validar e continuar'
									)}
								</Button>
							</Box>
						</form>
					</Paper>
				)}

				{phase === 'panel' && (
					<>
						<Box mb={2}>
							<Button size="small" onClick={handleLogout}>
								Trocar chave / sair
							</Button>
						</Box>

						{busy && !form ? (
							<CircularProgress />
						) : form ? (
							<>
								<Paper style={{ padding: 20, marginBottom: 16 }}>
									<Typography variant="subtitle1" gutterBottom>
										Textos da página
									</Typography>
									<form onSubmit={handleSaveSettings}>
										<TextField
											fullWidth
											label="Título do separador (document.title)"
											value={form.documentTitle}
											onChange={(e) =>
												updateField(
													'documentTitle',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>
										<TextField
											fullWidth
											label="Título principal (hero)"
											value={form.heroTitle}
											onChange={(e) =>
												updateField('heroTitle', e.target.value)
											}
											margin="dense"
											variant="outlined"
										/>
										<TextField
											fullWidth
											label="Subtítulo da lista"
											value={form.listSubtitle}
											onChange={(e) =>
												updateField(
													'listSubtitle',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>
										<Divider style={{ margin: '12px 0' }} />
										<Typography variant="subtitle2" gutterBottom>
											Paleta de cores (tema)
										</Typography>
										<FormControl
											fullWidth
											margin="dense"
											variant="outlined"
										>
											<InputLabel id="config-theme-label">
												Escolher tema
											</InputLabel>
											<Select
												labelId="config-theme-label"
												label="Escolher tema"
												value={form.themeVariation}
												onChange={(e) =>
													updateField(
														'themeVariation',
														Number(e.target.value)
													)
												}
											>
												{THEME_PALETTES.map((p) => (
													<MenuItem key={p.id} value={p.id}>
														{getThemeSelectOptionLabel(p)}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<TextField
											fullWidth
											multiline
											minRows={3}
											label="Texto introdutório"
											value={form.introPrimary}
											onChange={(e) =>
												updateField(
													'introPrimary',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>
										<TextField
											fullWidth
											multiline
											minRows={2}
											label="Nota / observação"
											value={form.introNote}
											onChange={(e) =>
												updateField('introNote', e.target.value)
											}
											margin="dense"
											variant="outlined"
										/>
										<TextField
											fullWidth
											multiline
											minRows={2}
											label="Envio / morada"
											value={form.introShipping}
											onChange={(e) =>
												updateField(
													'introShipping',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>

										<Divider style={{ margin: '16px 0' }} />
										<Typography variant="subtitle2" gutterBottom>
											Acordeão (lista de presentes)
										</Typography>
										<TextField
											fullWidth
											label="Etiqueta do nome"
											value={form.accordion.nameFieldLabel}
											onChange={(e) =>
												updateAccordion(
													'nameFieldLabel',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>
										<TextField
											fullWidth
											label="Texto do botão assinar"
											value={form.accordion.signButton}
											onChange={(e) =>
												updateAccordion(
													'signButton',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>
										<TextField
											fullWidth
											label="Prefixo “Assinado por”"
											value={form.accordion.signedByPrefix}
											onChange={(e) =>
												updateAccordion(
													'signedByPrefix',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>
										<TextField
											fullWidth
											label="Alerta nome obrigatório"
											value={form.accordion.nameRequiredAlert}
											onChange={(e) =>
												updateAccordion(
													'nameRequiredAlert',
													e.target.value
												)
											}
											margin="dense"
											variant="outlined"
										/>

										<Divider style={{ margin: '16px 0' }} />
										<Typography variant="subtitle2" gutterBottom>
											Imagem do topo
										</Typography>
										<input
											accept="image/*"
											style={{ display: 'none' }}
											id="hero-upload"
											type="file"
											onChange={handleImageFile}
										/>
										<label htmlFor="hero-upload">
											<Button
												variant="outlined"
												component="span"
												size="small"
											>
												Escolher imagem (base64)
											</Button>
										</label>
										<Button
											size="small"
											style={{ marginLeft: 8 }}
											onClick={() => {
												setClearCustomImage(true);
												setImagePreview(null);
												setForm((f) =>
													f ? { ...f, heroImageDataUrl: '' } : f
												);
											}}
										>
											Remover imagem personalizada
										</Button>
										{imagePreview && (
											<Box mt={1}>
												<img
													src={imagePreview}
													alt=""
													style={{ maxWidth: '100%', maxHeight: 180 }}
												/>
											</Box>
										)}

										<Box mt={2}>
											<Button
												type="submit"
												variant="contained"
												color="primary"
												disabled={busy}
											>
												Guardar configurações
											</Button>
											{saveMsg && (
												<Typography
													variant="body2"
													style={{ marginLeft: 12, display: 'inline' }}
												>
													{saveMsg}
												</Typography>
											)}
										</Box>
									</form>
								</Paper>

								<Paper style={{ padding: 20 }}>
									<Typography variant="subtitle1" gutterBottom>
										Itens da lista
									</Typography>
									<Box
										display="flex"
										flexWrap="wrap"
										alignItems="center"
										mb={2}
										style={{ gap: 8 }}
									>
										<TextField
											size="small"
											fullWidth
											label="Novo item"
											value={newItemLabel}
											onChange={(e) =>
												setNewItemLabel(e.target.value)
											}
											variant="outlined"
											style={{ flex: '1 1 200px', minWidth: 160 }}
										/>
										<Box
											display="flex"
											alignItems="center"
											flexShrink={0}
											style={{
												border: `1px solid ${t.accent}`,
												borderRadius: 4,
												padding: '0 4px',
											}}
										>
											<IconButton
												size="small"
												aria-label="diminuir quantidade"
												onClick={() => bumpQuantity(-1)}
												disabled={busy || newItemQuantity <= MIN_ITEM_QTY}
											>
												<RemoveIcon fontSize="small" />
											</IconButton>
											<Typography
												variant="body2"
												component="span"
												style={{
													minWidth: 28,
													textAlign: 'center',
													color: t.text,
												}}
											>
												{newItemQuantity}
											</Typography>
											<IconButton
												size="small"
												aria-label="aumentar quantidade"
												onClick={() => bumpQuantity(1)}
												disabled={busy || newItemQuantity >= MAX_ITEM_QTY}
											>
												<AddIcon fontSize="small" />
											</IconButton>
										</Box>
										<Button
											variant="contained"
											color="primary"
											onClick={handleAddItem}
											disabled={busy}
											style={{ flexShrink: 0 }}
										>
											Adicionar
										</Button>
									</Box>
									<List dense disablePadding>
										{lista.map((row) => (
											<ListItem
												key={row._id}
												style={{
													borderBottom: `1px solid ${t.accent}`,
												}}
											>
												<ListItemText
													primary={`#${row.id}`}
													secondary={row.item}
													primaryTypographyProps={{
														variant: 'caption',
													}}
													secondaryTypographyProps={{
														variant: 'body2',
													}}
												/>
												<IconButton
													edge="end"
													size="small"
													onClick={() =>
														handleRemoveItem(row._id)
													}
													aria-label="remover"
												>
													<DeleteOutlineIcon fontSize="small" />
												</IconButton>
											</ListItem>
										))}
									</List>
								</Paper>
							</>
						) : null}
					</>
				)}
			</Box>
		</Box>
	);
}
