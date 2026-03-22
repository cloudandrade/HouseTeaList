'use client';

import React, { useState } from 'react';
import {
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	FormControlLabel,
	Checkbox,
	TextField,
	Button,
	makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
	DEMO_ONLY_MESSAGE,
	NAME_REQUIRED_ALERT,
} from '../config/systemMessages';
import { useAppDialog } from '../context/AppDialogContext';
import './Accordion/styles.css';

const DEMO_SIGNED_NAME = 'xpto';

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

/**
 * Lista estática para a home de demonstração — imita o comportamento visual da lista real.
 */
export default function DemoStaticGiftList({ items, content }) {
	const { theme } = content;
	const { showAlert } = useAppDialog();
	const textFieldClasses = useTextFieldStyles();
	const list = Array.isArray(items) ? items : [];
	const [namesById, setNamesById] = useState({});

	const setNameFor = (id, value) => {
		setNamesById((prev) => ({ ...prev, [id]: value }));
	};

	const handleDemoAssinar = (item) => {
		const nome = String(namesById[item.id] ?? '').trim();
		if (nome.length <= 2) {
			void showAlert({
				title: 'Nome obrigatório',
				message: NAME_REQUIRED_ALERT,
			});
			return;
		}
		void showAlert({
			title: 'Demonstração',
			message: DEMO_ONLY_MESSAGE,
			confirmLabel: 'Entendi',
		});
	};

	return (
		<div style={{ opacity: 0.95, width: '100%' }}>
			{list.map((item, index) => {
				const isFirst = index === 0;
				return (
					<div key={item.id}>
						<Accordion
							className="accordion"
							defaultExpanded={isFirst}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`demo-panel-${item.id}`}
								id={`demo-header-${item.id}`}
							>
								<FormControlLabel
									control={
										<Checkbox
											color="primary"
											checked={isFirst}
											disabled={isFirst}
											onClick={(e) => e.stopPropagation()}
											onFocus={(e) => e.stopPropagation()}
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
									isFirst
										? {
												backgroundColor: theme.primary,
												color: theme.textOnPrimary,
											}
										: { backgroundColor: theme.surface }
								}
							>
								{isFirst ? (
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
											{DEMO_SIGNED_NAME}
										</Typography>
									</div>
								) : (
									<form
										className="accordion-sign-form"
										onSubmit={(e) => {
											e.preventDefault();
											handleDemoAssinar(item);
										}}
									>
										<TextField
											fullWidth
											classes={{ root: textFieldClasses.root }}
											label={content.accordion.nameFieldLabel}
											variant="outlined"
											size="small"
											value={namesById[item.id] ?? ''}
											onChange={(e) =>
												setNameFor(item.id, e.target.value)
											}
											onClick={(e) => e.stopPropagation()}
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
								)}
							</AccordionDetails>
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}
