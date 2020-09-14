import {
  Button, Card,


  CardActions, CardContent, CardHeader,


  Divider,
  Grid,

  TextField
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../../Services/api';
import localidades from '../../../../Services/localidades';


const useStyles = makeStyles(() => ({
  root: {}
}));



const AccountDetails = props => {
  const { className, ...rest } = props;
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state , setState] = useState(localStorage.getItem('usrState'));
  const [city , setCity] = useState(localStorage.getItem('usrCity'));
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
    id: localStorage.getItem('usrId'),
    name: localStorage.getItem('usrName'),
    cpf: localStorage.getItem('usrCpf'),
    course: localStorage.getItem('usrCourse'),
    email: localStorage.getItem('usrMail'),
    knowledge: localStorage.getItem('usrKnow'),
    phone: localStorage.getItem('usrPhone'),
    status: localStorage.getItem('usrStatus')
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
      const response = await api.put('users', data);

      alert(`Usuário Atualizado!`);

      localStorage.setItem('usrName', response.data.name);
      localStorage.setItem('usrMail', response.data.email);
      localStorage.setItem('usrPhone', response.data.phone);
      localStorage.setItem('usrCourse', response.data.course);
      localStorage.setItem('usrKnow', response.data.knowledge);
      localStorage.setItem('usrState', response.data.state);
      localStorage.setItem('usrCity', response.data.city);
      localStorage.setItem('usrStatus', response.data.status);
    
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
                name="cpf"
                onChange={handleChange}
                disabled
                value={values.cpf}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                label="E-mail"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
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
                label="Telefone"
                margin="dense"
                name="phone"
                onChange={handleChange}             
                value={values.phone}
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
                label="Curso"
                margin="dense"
                name="course"
                onChange={handleChange}
                required
                value={values.course}
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
                multiline
                rows={4}
                label="Conhecimento"
                margin="dense"
                name="knowledge"
                onChange={handleChange}
                required
                value={values.knowledge}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
               <FormControl variant="outlined" className="w-full">
              <InputLabel>Buscando por</InputLabel>
                <Select
                  required
                  id="status"
                  name="status"
                  margin="dense"
                  value={values.status}
                  onChange={handleChange}
                  label="Buscando"
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value='Estágio'>Estágio</MenuItem>
                  <MenuItem value='Admissão'>Admissão</MenuItem>
                  <MenuItem value='Estágio ou Admissão'>Estágio ou Admissão</MenuItem>
                </Select>
            </FormControl>
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
