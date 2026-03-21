import React, { useState, useEffect } from 'react';
import {
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	makeStyles,
	withStyles,
	TextField,
	Button,
	CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getAll, updateItem } from '../../service/requestService';
import { APP_CONTENT } from '../../config/appContent';
import { APP_THEME } from '../../config/theme';

// Cores do checkbox vêm de overrides em src/config/muiTheme.js (colorPrimary)
//>>>>>>>>>>>>>textfield
const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: APP_THEME.primary,
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: APP_THEME.primary,
		},
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: APP_THEME.primary,
			},
		},
	},
})(TextField);
//<<<<<<<<<<<<<textfield
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
			alert(APP_CONTENT.accordion.nameRequiredAlert);
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
					<CircularProgress style={{ color: APP_THEME.primary }} />
				</div>
			) : (
				lista.map(function (item, index) {
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
											color: APP_THEME.text,
										}}
									>
										{item.item}
									</Typography>
								</AccordionSummary>
								<AccordionDetails
									style={
										item.checked === false
											? { backgroundColor: APP_THEME.surface }
											: {
													backgroundColor: APP_THEME.primary,
													color: APP_THEME.textOnPrimary,
												}
									}
								>
									{/**Aqui é validado se o check é true ou não */
									/** se o
									check for false exibirá o campo para preencher o nome e
									botao */
									/** se o check for true exibira o nome de quem
									assinou */}
									{item.checked === false ? (
										<Typography>
											<form>
												<CssTextField
													className="text"
													label={APP_CONTENT.accordion.nameFieldLabel}
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
													onClick={(e) => handleAssinar(item)}
												>
													{APP_CONTENT.accordion.signButton}
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
													color: APP_THEME.textOnPrimary,
												}}
											>
												{APP_CONTENT.accordion.signedByPrefix}
											</Typography>
											<Typography
												style={{
													fontSize: 16,
													marginLeft: '5px',
													color: APP_THEME.textOnPrimary,
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
