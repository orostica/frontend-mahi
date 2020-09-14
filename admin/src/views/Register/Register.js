import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import api from '../../Services/api';
import localidades from '../../Services/localidades';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Register() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const history = useHistory();

  useEffect(() => {
    localidades
      .get('/api/v1/localidades/estados')
      .then(response => {
        setStates(response.data);
      });

      localidades.get(`/api/v1/localidades/estados/${state}/municipios`).then(response => {setCities(response.data)})
  }, [state]);

  async function handleRegister(e) {
    e.preventDefault();

    console.log(
      {name,city}
    )

    //Variavel que gaurda os dados para enviar para a api
    const data = {
        name,
        password,
        description,
        state,
        city
    };

    //Traz a resposta para o usuario se deu certo
    try {
      const response = await api.post('employers', data);

      alert(`Seu ID de acesso, Guarde para realizar o Login: ${response.data.id}`);
    

      history.push('/'); //Retornar usuario para a pagina inicial
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastrar Empresa
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                autoComplete="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Estado"
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
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Cidade"
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl required>
              <FormControlLabel
                required
                control={<Checkbox value="allowExtraEmails" color="primary" required/>}
                label="Estou ciente do código ÚNICO de acesso que será gerado automaticamente para realização do Login."               
              />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Ja é cadastrado? Então faça o Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}