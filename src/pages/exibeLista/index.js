import { Typography } from '@mui/material';
import React from 'react';

import Foto from '../../../src/img/img1.jpg';
import Lista from '../../components/Accordion';

import './styles.css';

function exibeLista() {
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
          Gostaríamos de humildemente pedir um apoio, vamos nos casar
          em Dezembro e iremos nos mudar para uma casa nova! Faça
          parte da nossa história, deixe sua contribuição e
          lembraremos sempre de você!
        </Typography>
        <Typography
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
          Caso queiram enviar direto ao endereço: Travessa Teodoro
          Sampaio, Nº 37, Vale das Pedrinhas, Salvador - BA,
          41925-790. Não esqueca de nos comunicar ao comprar!
        </Typography>
      </div>
      <Lista />
    </div>
  );
}

export default exibeLista;
