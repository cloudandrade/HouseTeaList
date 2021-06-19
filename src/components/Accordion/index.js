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
	const [state, setState] = React.useState({
		c1: true,
		c2: false,
		c3: false,
		c4: false,
		c5: false,
		c6: false,
		c7: false,
		c8: false,
		c9: false,
		c10: false,
		c11: false,
		c12: false,
		c13: false,
		c14: false,
		c15: false,
		c16: false,
		c17: false,
		c18: false,
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

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
									control={
										<GreenCheckbox
											checked={item.checked}
											onChange={handleChange}
											name="checkedG"
										/>
									}
								/>
								<Typography style={{ marginTop: '5px', fontSize: 20 }}>
									{item.item}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<form noValidate autoComplete="off">
										<CssTextField
											className={classes.margin}
											className="text"
											label="Seu Nome"
											variant="outlined"
											size="small"
											style={{}}
										/>

										<Button
											variant="contained"
											className="button"
											style={{
												marginLeft: '10px',
												marginTop: '4px',
												backgroundColor: '#c38a9e',
											}}
										>
											Assinar
										</Button>
									</form>
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}
