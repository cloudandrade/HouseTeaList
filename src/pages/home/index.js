import React, { useEffect } from 'react';

import Header from './components/Header';
import MyLists from './components/MyLists';
import { userInfo } from '../../helpers/mock.data';
import { useNavigate } from 'react-router-dom';

// import { Container } from './styles';

function Home() {
  const navigate = useNavigate();
  const { id: idUser, nome, usuario, tokenAcesso, listas } = userInfo;
  /*  localStorage.setItem(
    'accessToken',
    'asdfg651dsg-*1sa.dg6sadg.61sad6g51sadg51'
  ); */
  let userAuth = localStorage.getItem('accessToken');

  useEffect(() => {
    if (userAuth === null || !userAuth) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Header nomeUsuario={nome} />
      <MyLists listas={listas} />
    </>
  );
}

export default Home;
