import React from 'react';
import ReactDOM from 'react-dom';
/* Primeiro: aplica --color-* no <html> a partir do .env (ver theme.js) */
import './config/theme.js';
import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
