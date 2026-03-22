'use client';

import React, { useState, useEffect } from 'react';
import {
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	makeStyles,
	TextField,
	Button,
	CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getAll, updateItem } from '../../service/requestService';
import { useAppContent } from '../../context/AppContentContext';
import { NAME_REQUIRED_ALERT } from '../../config/systemMessages';

const useTextFieldStyles = makeStyles((theme) => ({
	root: {
		'& label.Mui-focused': {
			color: theme.palette.primary.main,
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: theme.palette.primary.main,
		},
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: theme.palette.primary.main,
			},
		},
	},
}));

const useStyles = makeStyles((theme) => ({
	root: {
		opacity: 0.9,
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

export default function SimpleAccordion() {
	const classes = useStyles();
	const textFieldClasses = useTextFieldStyles();
	const { content, slug } = useAppContent();
	const { theme } = content;
	const [lista, setLista] = useState([]);
	const [namesById, setNamesById] = useState({});
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState(false);

	useEffect(() => {
		if (!slug) return;
		fetchData();
	}, [slug]);

	function fetchData() {
		if (!slug) return;
		setLoading(true);
		setLoadError(false);

		getAll(slug)
			.then((response) => {
				setLista(Array.isArray(response.data) ? response.data : []);
				setLoadError(false);
			})
			.catch((error) => {
				console.error(error);
				setLista([]);
				setLoadError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function handleAssinar(item) {
		const id = item._id || item.id;
		const nome = String(namesById[id] ?? '').trim();
		if (nome.length > 2) {
			const payload = { ...item, nome, checked: true };

			updateItem(slug, payload)
				.then((response) => {
					console.log(response);
					setNamesById((prev) => ({ ...prev, [id]: '' }));
					fetchData();
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			alert(NAME_REQUIRED_ALERT);
		}
	}

	return (
		<div className={classes.root}>
			{loading ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: 120,
					}}
				>
					<CircularProgress style={{ color: theme.primary }} />
				</div>
			) : loadError ? (
				<Typography
					align="center"
					style={{
						padding: '24px 16px',
						color: theme.text,
					}}
				>
					Não foi possível carregar a lista.
				</Typography>
			) : lista.length === 0 ? (
				<Typography
					align="center"
					style={{
						padding: '24px 16px',
						color: theme.text,
					}}
				>
					Lista vazia.
				</Typography>
			) : (
				lista.map(function (item) {
					return (
						<div key={item._id || item.id}>
							<Accordion className="accordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={item.checked}
											/>
										}
									/>
									<Typography
										style={{
											marginTop: '5px',
											fontSize: 20,
											color: theme.text,
										}}
									>
										{item.item}
									</Typography>
								</AccordionSummary>
								<AccordionDetails
									className="accordion-details-pane"
									style={
										item.checked === false
											? { backgroundColor: theme.surface }
											: {
													backgroundColor: theme.primary,
													color: theme.textOnPrimary,
												}
									}
								>
									{item.checked === false ? (
										<form
											className="accordion-sign-form"
											onSubmit={(e) => {
												e.preventDefault();
												handleAssinar(item);
											}}
										>
											<TextField
												fullWidth
												classes={{ root: textFieldClasses.root }}
												label={content.accordion.nameFieldLabel}
												variant="outlined"
												size="small"
												value={
													namesById[item._id || item.id] ?? ''
												}
												onChange={(e) => {
													const id = item._id || item.id;
													setNamesById((prev) => ({
														...prev,
														[id]: e.target.value,
													}));
												}}
											/>
											<Button
												type="submit"
												variant="contained"
												color="primary"
												className="accordion-sign-button"
											>
												{content.accordion.signButton}
											</Button>
										</form>
									) : (
										<div className="assinado-div">
											<Typography
												component="span"
												style={{
													fontSize: 16,
													fontWeight: 'bold',
													color: theme.textOnPrimary,
												}}
											>
												{content.accordion.signedByPrefix}
											</Typography>
											<Typography
												component="span"
												style={{
													fontSize: 16,
													color: theme.textOnPrimary,
												}}
											>
												{item.nome}
											</Typography>
										</div>
									)}
								</AccordionDetails>
							</Accordion>
						</div>
					);
				})
			)}
		</div>
	);
}
