import React from 'react';

import Leaf from '../../../img/leaf.png';
import Mug from '../../../img/mug.png';
import './styles.css';
import PowerOffIcon from '@mui/icons-material/PowerSettingsNew';
// import { Container } from './styles';

function Header({ nomeUsuario }) {
  return (
    <>
      {/* NAVBAR */}
      <div className="header-container">
        <div className="header-brand-group">
          <div className="header-brand">AnyTea</div>
          <div className="header-logo">
            <img
              src={Leaf}
              className="header-img-brand1"
              alt="leaf"
            />
            <img src={Mug} className="header-img-brand2" alt="mug" />
          </div>
        </div>

        <div className="header-text">
          Olá <strong>{nomeUsuario}</strong>, seja bem vindo(a)
        </div>

        <button className="header-button">
          <PowerOffIcon style={{ marginTop: '7px' }} />
        </button>
      </div>
      {/* NAVBAR END */}
    </>
  );
}

export default Header;
