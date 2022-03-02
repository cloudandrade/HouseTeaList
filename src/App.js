import { Typography } from '@material-ui/core';

import Foto from '../src/img/img1.jpg';
import Lista from './components/Accordion';

import './App.css';

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
          Meu Chá de casa nova!
        </Typography>
      </div>
      <div className="box1">
        <div className="child1">
          <img src={Foto} className="img" alt="foto de solange" />
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
          Lista de Solange
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
          Que tal uma mãozinha na composição da minha casa?
        </Typography>
        {/* <Typography
          style={{
            margin: '12px',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          Obs: Respeitando o isolamento, os que assinarem receberão em
          mãos uma lembrança e comemoraremos individualmente com o(a)
          amigo(a) que nos presentear durante essa entrega.
        </Typography> */}
        <Typography
          style={{
            margin: '12px',
            marginTop: -10,
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          Caso queiram enviar direto ao endereço: Travessa Teodoro
          Sampaio, Nº 37, Vale das Pedrinhas, Salvador - BA,
          41925-790. Caso opte por isso, não esqueca de me avisar ao
          comprar!
        </Typography>
      </div>
      <Lista />
    </div>
  );
}

export default App;
