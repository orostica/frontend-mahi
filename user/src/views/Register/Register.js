import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useEffect, useState } from 'react';
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
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [knowledge, setKnowledge] = useState('');
  const [status, setStatus] = useState('');

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
        cpf,
        password,
        course,
        email,
        phone,
        knowledge,
        state,
        city,
        status
    };

    //Traz a resposta para o usuario se deu certo
    try {
      const response = await api.post('users', data);

      alert(`Seja bem vindo ${response.data.name}! Utilize seu CPF para realizar o login.`);
    

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
          Cadastrar Usuário/Estudante
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
                autoComplete="cpf"
                name="cpf"
                variant="outlined"
                required
                fullWidth
                id="cpf"
                label="CPF"
                autoFocus
                value={cpf}
                onChange={e => setCpf(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"            
                fullWidth
                id="phone"
                label="Telefone"
                name="phone"
                autoComplete="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="course"
                label="Curso"
                name="course"
                value={course}
                onChange={e => setCourse(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                multiline
                rows={5}
                fullWidth
                id="knowledge"
                label="Conhecimento"
                name="knowledge"
                value={knowledge}
                onChange={e => setKnowledge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>

            <FormControl variant="outlined" className="w-full">
            <InputLabel>Buscando por</InputLabel>
                <Select
                  required
                  id="status"
                  name="status"
                  margin="dense"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
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