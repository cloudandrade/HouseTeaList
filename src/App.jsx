import './App.css';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Lista from './components/Accordion';
import { APP_CONTENT } from './config/appContent';

function App() {
	useEffect(() => {
		document.title = APP_CONTENT.documentTitle;
	}, []);

	return (
		<div className="App">
			<div className="box1">
				<Typography
					style={{
						fontFamily: 'Alex Brush',
						fontSize: '38px',
						fontWeight: 'bold',
					}}
				>
					{APP_CONTENT.heroTitle}
				</Typography>
			</div>
			<div className="box1">
				<div className="child1">
					<img src={APP_CONTENT.heroImage} className="img" alt="" />
				</div>
			</div>
			<div className="box1">
				<Typography
					style={{
						fontFamily: 'Alex Brush',
						fontSize: '32px',
						fontWeight: 'bold',
					}}
				>
					{APP_CONTENT.listSubtitle}
				</Typography>
			</div>

			<div className="box3">
				<Typography
					style={{
						margin: '15px',
						fontFamily: 'Roboto',
						fontSize: '16px',
						fontWeight: '600',
					}}
				>
					{APP_CONTENT.introPrimary}
				</Typography>
				<Typography
					style={{
						margin: '12px',
						fontFamily: 'Roboto',
						fontSize: '12px',
						fontWeight: '600',
					}}
				>
					{APP_CONTENT.introNote}
				</Typography>
				<Typography
					style={{
						margin: '12px',
						marginTop: -10,
						fontFamily: 'Roboto',
						fontSize: '12px',
						fontWeight: '600',
					}}
				>
					{APP_CONTENT.introShipping}
				</Typography>
			</div>
			<Lista />
		</div>
	);
}

export default App;
