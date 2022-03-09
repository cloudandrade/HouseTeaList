import MoreVertIcon from '@mui/icons-material/MoreVert';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

import './styles.css';

// import { Container } from './styles';

function MyLists({ listas }) {
  return (
    <>
      <div className="mylists-container">
        <br />
        <span className="mylists-title">Suas Listas Criadas: </span>
        <div className="mylists-listarea">
          {listas.map((i) => {
            return (
              <CustomCard
                id={i.id}
                nomeLista={i.nomeLista}
                tipoLista={i.tipoLista}
                qtdItens={i.qtdItensTotal}
                qtdAssinados={i.qtdItensAssinados}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function CustomCard({
  nomeLista,
  tipoLista,
  qtdItens,
  qtdAssinados,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card sx={{ maxWidth: 250 }}>
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="settings"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Ver</MenuItem>
                <MenuItem onClick={handleClose}>Editar</MenuItem>
                <MenuItem onClick={handleClose}>Excluir</MenuItem>
              </Menu>
            </>
          }
          title={nomeLista}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Tipo de lista: {tipoLista}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantidade de itens: {qtdItens}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantidade de assinaturas: {qtdAssinados}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default MyLists;
