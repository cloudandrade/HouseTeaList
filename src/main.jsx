import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Primeiro: aplica --color-* no <html> (theme.js + VITE_THEME_VARIATION) */
import './config/theme.js';
import './index.css';
import { AppContentProvider } from './context/AppContentContext';
import { DynamicThemeProvider } from './context/DynamicThemeProvider';
import Home from './pages/Home';
import ConfigAdmin from './pages/ConfigAdmin';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AppContentProvider>
				<DynamicThemeProvider>
					<Routes>
						<Route path="/config" element={<ConfigAdmin />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</DynamicThemeProvider>
			</AppContentProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
