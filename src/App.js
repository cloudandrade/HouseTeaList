import './App.css';
import Foto from '../src/img/img1.jpg';
import { Typography } from '@material-ui/core';
import Lista from './components/Accordion';

function App() {
	return (
		<div className="App">
			<div className="box1">
				<Typography variant="subtitle2" component="h2">
					Nosso Chá de casa nova!
				</Typography>
			</div>
			<div className="box1">
				<div className="child1">
					<img src={Foto} className="img" />
				</div>
			</div>
			<div className="box1">
				<Typography variant="subtitle2" component="h2">
					Lista de Kaire e Jan
				</Typography>
			</div>
			<Lista />
		</div>
	);
}

export default App;
