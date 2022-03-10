import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { makeStyles, withStyles } from '@mui/styles';
/* import { useEffect, useRef, useState } from '@mui/styles'; */
import React, { useEffect, useRef, useState } from 'react';

import { getAll, updateItem } from '../../service/requestService';

import './styles.css';

//>>>>>>>>>>>>>>checkbox
const GreenCheckbox = withStyles({
  root: {
    color: '#f8bbd0',
    '&$checked': {
      color: '#c38a9e',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
//<<<<<<<<<<<<<<checkbox
//>>>>>>>>>>>>>>loading
const loadStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: '5px',
    },
  },
}));
//<<<<<<<<<<<<<<loading

//>>>>>>>>>>>>>textfield
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#c38a9e',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#c38a9e',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#c38a9e',
      },
    },
  },
})(TextField);
//<<<<<<<<<<<<<textfield
const useStyles = makeStyles((theme) => ({
  root: {
    opacity: 0.9,
    width: '100%',
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const loadclasses = loadStyles();
  const textRef = React.useRef();
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setLista([]);

    getAll()
      .then((response) => {
        setLista(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAssinar(item) {
    if (nome.length > 2) {
      item.nome = nome;
      item.checked = true;

      updateItem(item)
        .then((response) => {
          console.log(response);
          fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('É necessário digitar um nome antes de assinar!');
    }
  }

  return (
    <div className="exibirLista-container">
      <div className={classes.root}>
        {lista.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress style={{ color: '#c38a9e' }} />
          </div>
        ) : (
          lista.map(function (item, index) {
            return (
              <div>
                <Accordion className="accordion" key={item.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <GreenCheckbox checked={item.checked} />
                    <Typography
                      style={{ marginTop: '5px', fontSize: 20 }}
                    >
                      {item.item}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={
                      item.checked === false
                        ? { backgroundColor: '#ffffff' }
                        : { backgroundColor: '#c38a9e' }
                    }
                  >
                    {/**Aqui é validado se o check é true ou não */
                    /** se o
									check for false exibirá o campo para preencher o nome e
									botao */
                    /** se o check for true exibira o nome de quem
									assinou */}
                    {item.checked === false ? (
                      <Typography>
                        <form>
                          <CssTextField
                            className={classes.margin}
                            className="text"
                            label="Seu Nome"
                            variant="outlined"
                            size="small"
                            onBlur={(e) => setNome(e.target.value)}
                          />

                          <Button
                            variant="contained"
                            className="button"
                            style={{
                              marginLeft: '10px',
                              marginTop: '4px',
                              backgroundColor: '#c38a9e',
                            }}
                            onClick={(e) => handleAssinar(item)}
                          >
                            Assinar
                          </Button>
                        </form>
                      </Typography>
                    ) : (
                      <div className="assinado-div">
                        <Typography
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginLeft: '10px',
                          }}
                        >
                          Assinado por:
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 16,
                            marginLeft: '5px',
                          }}
                        >
                          {item.nome}
                        </Typography>
                      </div>
                    )}
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
