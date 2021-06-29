import './App.css';
import Foto from '../src/img/img1.jpg';
import { Typography } from '@material-ui/core';
import Lista from './components/Accordion';

function App() {
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
					Nosso Chá de casa nova!
				</Typography>
			</div>
			<div className="box1">
				<div className="child1">
					<img src={Foto} className="img" />
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
					Lista de Jan & Kaire
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
					Gostaríamos de humildemente pedir um apoio, vamos nos casar em
					Dezembro e iremos nos mudar para uma casa nova! Faça parte da nossa
					história, deixe sua contribuição e lembraremos sempre de você!
				</Typography>
				<Typography
					style={{
						margin: '12px',
						fontFamily: 'Roboto',
						fontSize: '12px',
						fontWeight: '600',
					}}
				>
					Obs: Respeitando o isolamento, os que assinarem receberão em mãos uma
					lembrança e comemoraremos individualmente com o(a) amigo(a) que nos
					presentear durante essa entrega.
				</Typography>
			</div>
			<Lista />
		</div>
	);
}

export default App;
