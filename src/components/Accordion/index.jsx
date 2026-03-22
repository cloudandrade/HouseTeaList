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
	const { content } = useAppContent();
	const { theme } = content;
	const [lista, setLista] = useState([]);
	const [nome, setNome] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	function fetchData() {
		setLista([]);

		getAll()
			.then((response) => {
				setLista(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function handleAssinar(item) {
		if (nome.length > 2) {
			item.nome = nome;
			item.checked = true;

			updateItem(item)
				.then((response) => {
					console.log(response);
					fetchData();
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			alert(content.accordion.nameRequiredAlert);
		}
	}

	return (
		<div className={classes.root}>
			{lista.length === 0 ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<CircularProgress style={{ color: theme.primary }} />
				</div>
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
										<Typography>
											<form>
												<TextField
													className="text"
													classes={{ root: textFieldClasses.root }}
													label={content.accordion.nameFieldLabel}
													variant="outlined"
													size="small"
													onBlur={(e) =>
														setNome(e.target.value)
													}
												/>

												<Button
													variant="contained"
													color="primary"
													className="button"
													style={{
														marginLeft: '10px',
														marginTop: '4px',
													}}
													onClick={() => handleAssinar(item)}
												>
													{content.accordion.signButton}
												</Button>
											</form>
										</Typography>
									) : (
										<div className="assinado-div">
											<Typography
												style={{
													fontSize: 16,
													fontWeight: 'bold',
													marginLeft: '10px',
													color: theme.textOnPrimary,
												}}
											>
												{content.accordion.signedByPrefix}
											</Typography>
											<Typography
												style={{
													fontSize: 16,
													marginLeft: '5px',
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
