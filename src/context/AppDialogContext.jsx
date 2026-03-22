'use client';

import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@material-ui/core';

const AppDialogContext = createContext(null);

/**
 * @typedef {object} AlertOptions
 * @property {string} [title]
 * @property {string} message
 * @property {string} [confirmLabel]
 */

/**
 * @typedef {object} ConfirmOptions
 * @property {string} [title]
 * @property {string} message
 * @property {string} [confirmLabel]
 * @property {string} [cancelLabel]
 */

export function AppDialogProvider({ children }) {
	const [state, setState] = useState(null);

	const showAlert = useCallback((options) => {
		const opts = typeof options === 'string' ? { message: options } : options;
		return new Promise((resolve) => {
			setState({
				variant: 'alert',
				title: opts.title ?? '',
				message: opts.message,
				confirmLabel: opts.confirmLabel ?? 'OK',
				resolveOnce: () => {
					resolve();
				},
			});
		});
	}, []);

	const showConfirm = useCallback((options) => {
		return new Promise((resolve) => {
			setState({
				variant: 'confirm',
				title: options.title ?? 'Confirmar',
				message: options.message,
				confirmLabel: options.confirmLabel ?? 'Confirmar',
				cancelLabel: options.cancelLabel ?? 'Cancelar',
				resolveOnce: (value) => {
					resolve(value);
				},
			});
		});
	}, []);

	const closeAlert = useCallback(() => {
		setState((s) => {
			if (s?.variant === 'alert') {
				s.resolveOnce?.();
				return null;
			}
			return s;
		});
	}, []);

	const finishConfirm = useCallback((confirmed) => {
		setState((s) => {
			if (s?.variant === 'confirm') {
				s.resolveOnce?.(confirmed);
				return null;
			}
			return s;
		});
	}, []);

	const handleDialogClose = useCallback(
		(_event, reason) => {
			if (!state) return;
			if (state.variant === 'confirm') {
				if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
					finishConfirm(false);
				}
			} else {
				closeAlert();
			}
		},
		[state, closeAlert, finishConfirm]
	);

	const value = useMemo(
		() => ({ showAlert, showConfirm }),
		[showAlert, showConfirm]
	);

	const title =
		state?.title != null && String(state.title).trim() !== ''
			? state.title
			: null;

	return (
		<AppDialogContext.Provider value={value}>
			{children}
			<Dialog
				open={Boolean(state)}
				onClose={handleDialogClose}
				maxWidth="xs"
				fullWidth
			>
				{title ? <DialogTitle>{title}</DialogTitle> : null}
				<DialogContent>
					<DialogContentText component="div" style={{ whiteSpace: 'pre-wrap' }}>
						{state?.message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{state?.variant === 'confirm' ? (
						<Button onClick={() => finishConfirm(false)} color="default">
							{state.cancelLabel}
						</Button>
					) : null}
					<Button
						onClick={() => {
							if (state?.variant === 'confirm') finishConfirm(true);
							else closeAlert();
						}}
						color="primary"
						variant="contained"
						autoFocus
					>
						{state?.variant === 'confirm'
							? state.confirmLabel
							: state?.confirmLabel}
					</Button>
				</DialogActions>
			</Dialog>
		</AppDialogContext.Provider>
	);
}

export function useAppDialog() {
	const ctx = useContext(AppDialogContext);
	if (!ctx) {
		throw new Error('useAppDialog deve ser usado dentro de AppDialogProvider.');
	}
	return ctx;
}
