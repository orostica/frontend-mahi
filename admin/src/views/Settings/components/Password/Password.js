import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import api from '../../../../Services/api';

const useStyles = makeStyles(() => ({
  root: {}
}));


const Password = props => {
  const { className, ...rest } = props;
  const history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  async function handleUpdatePass(){

    const data = {
      id:localStorage.getItem('empId'),
      
    }

      data.password = values.password;
      data.confirmPassword = values.confirm;

      try {
        const response = await api.put('/empPass', data );
  

        alert(response.data);

        
        history.push('/settings');
   
      } catch (err) {
        alert('Erro na exclusão, tente novamente.');
      }
  
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Atualizar Senha"
          title="Senha"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Senha"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar Senha"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdatePass}
          >
            Atualizar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
