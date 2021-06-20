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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.css';
import ListaJson from '../Lista/ListaChaCasaNova.json';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//>>>>>>>>>>>>>>checkbox
const GreenCheckbox = withStyles({
	root: {
		color: '#f8bbd0',
		'&$checked': {
			color: '#c38a9e',
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);
//<<<<<<<<<<<<<<checkbox
//>>>>>>>>>>>>>textfield
const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#c38a9e',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#c38a9e',
		},
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: '#c38a9e',
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

	useEffect(() => {
		setLista(ListaJson);
	}, []);

	const [lista, setLista] = useState([]);
	const [nome, setNome] = useState('');

	function handleAssinar(item) {
		let listaAtualizada = lista.map(function (i, index) {
			if (i.id === item.id) {
				i.nome = nome;
				i.checked = true;
			}
			return i;
		});

		setLista(listaAtualizada);
	}

	return (
		<div className={classes.root}>
			{lista.map(function (item, index) {
				return (
					<div>
						<Accordion className="accordion" key={item.id}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<FormControlLabel
									control={<GreenCheckbox checked={item.checked} />}
								/>
								<Typography style={{ marginTop: '5px', fontSize: 20 }}>
									{item.item}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{/**Aqui é validado se o check é true ou não */
								/** se o
								check for false exibirá o campo para preencher o nome e
								botao */
								/** se o check for true exibira o nome de quem
								assinou */}
								{item.checked === false ? (
									<Typography>
										<form noValidate autoComplete="off">
											<CssTextField
												className={classes.margin}
												className="text"
												label="Seu Nome"
												variant="outlined"
												size="small"
												onChange={(e) => {
													setNome(e.target.value);
												}}
											/>

											<Button
												variant="contained"
												className="button"
												style={{
													marginLeft: '10px',
													marginTop: '4px',
													backgroundColor: '#c38a9e',
												}}
												onClick={(e) => handleAssinar(item)}
											>
												Assinar
											</Button>
										</form>
									</Typography>
								) : (
									<div>
										<Typography style={{ fontSize: 16 }}>
											Assinado por:
										</Typography>
										<Typography style={{ fontSize: 16 }}>
											{item.nome}
										</Typography>
									</div>
								)}
							</AccordionDetails>
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}
