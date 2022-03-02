import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';

import { getAll, updateItem } from '../../service/requestService';

import './styles.css';

//>>>>>>>>>>>>>>checkbox
const GreenCheckbox = withStyles({
  root: {
    color: '#ffed7a',
    '&$checked': {
      color: '#eecf06',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
//<<<<<<<<<<<<<<checkbox
//>>>>>>>>>>>>>>loading

//<<<<<<<<<<<<<<loading

//>>>>>>>>>>>>>textfield
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#ffed7a',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffed7a',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#ffed7a',
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

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
    <div className={classes.root}>
      {lista.length === 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress style={{ color: '#ffed7a' }} />
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
                  <FormControlLabel
                    control={<GreenCheckbox checked={item.checked} />}
                  />
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
                      : { backgroundColor: '#ffed7a' }
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
                            backgroundColor: '#ffed7a',
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
  );
}
