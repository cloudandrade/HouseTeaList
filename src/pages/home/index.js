import React from 'react';

import Header from './components/Header';
import MyLists from './components/MyLists';
import { userInfo } from '../../helpers/mock.data';

// import { Container } from './styles';

function home() {
  const { id: idUser, nome, usuario, tokenAcesso, listas } = userInfo;

  return (
    <>
      <Header nomeUsuario={nome} />
      <MyLists listas={listas} />
    </>
  );
}

export default home;
