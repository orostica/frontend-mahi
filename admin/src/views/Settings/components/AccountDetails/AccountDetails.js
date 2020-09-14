import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import api from '../../../../Services/api'
import localidades from '../../../../Services/localidades'

const useStyles = makeStyles(() => ({
  root: {}
}));



const AccountDetails = props => {
  const { className, ...rest } = props;
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state , setState] = useState(localStorage.getItem('empState'));
  const [city , setCity] = useState(localStorage.getItem('empCity'));
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    localidades
      .get('/api/v1/localidades/estados')
      .then(response => {
        setStates(response.data);
      });

      localidades.get(`/api/v1/localidades/estados/${state}/municipios`).then(response => {setCities(response.data)})
  }, [state]);

  const [values, setValues] = useState({
    name: localStorage.getItem('empName'),
    id: localStorage.getItem('empId'),
    description: localStorage.getItem('empDesc')
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  async function handleSubmit(e){
    e.preventDefault();

    const data ={
      ...values,
    }
    data.state = state;
    data.city = city;

    try {
      const response = await api.put('employers', data);

      alert(`Empresa Atualizada!`);

      localStorage.setItem('empName', response.data.name);
      localStorage.setItem('empDesc', response.data.description);
      localStorage.setItem('empState', response.data.state);
      localStorage.setItem('empCity', response.data.city);
    
      history.push('/dashboard');
  //Retornar usuario para a pagina inicial
    } catch (err) {
      alert('Erro na atualização, tente novamente.');
    }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="As informações podem ser editadas"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nome"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Id"
                margin="dense"
                name="name"
                onChange={handleChange}
                disabled
                value={values.id}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Descrição"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                value={values.description}
                variant="outlined"
              />
            </Grid>
          
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estado"
                margin="dense"
                name="state"
                onChange={e => setState(e.target.value)}
                required
                select
                value={state}
                variant="outlined"
              >
                {states.map(option => (
                  <option
                    key={option.id}
                    value={option.sigla}
                  >
                    {option.sigla}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={10}
              xs={12}
            >
             <TextField
                fullWidth
                label="Cidade"
                margin="dense"
                name="cty"
                onChange={e => setCity(e.target.value)}
                required
                select
                value={city}
                variant="outlined"
              >
                {cities.map(option => (
                  <option
                    key={option.id}
                    value={option.nome}
                  >
                    {option.nome}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            Salvar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
