import React from 'react';
import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';

import Cadastro from '../pages/cadastro/index';
import Lista from '../pages/exibeLista/index';
import Home from '../pages/home/index';
import Login from '../pages/login/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/lista/:listaId" element={<Lista />}></Route>
      </Router>
    </BrowserRouter>
  );
}
