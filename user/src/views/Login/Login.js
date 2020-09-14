import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../Services/api';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [cpf, setCpf] = useState('');
  const [password,setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('UserSessions', { cpf , password});

     
      localStorage.setItem('usrCpf', cpf);
      localStorage.setItem('usrId', response.data.id);
      localStorage.setItem('usrName', response.data.name);
      localStorage.setItem('usrMail', response.data.email);
      localStorage.setItem('usrCourse', response.data.course);
      localStorage.setItem('usrKnow', response.data.knowledge);
      localStorage.setItem('usrPhone', response.data.phone);
      localStorage.setItem('usrState', response.data.state);
      localStorage.setItem('usrCity', response.data.city);
      localStorage.setItem('usrStatus', response.data.status);

      history.push('/dashboard');
    } catch (err) {
      alert('Falha no login, Verifique os dados e tente novamente.');
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
          Login de usuários
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            autoComplete="cpf"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Autenticar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Cadastrar novo Usuário/Estudante"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}