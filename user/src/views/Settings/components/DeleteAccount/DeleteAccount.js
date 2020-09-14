import {
  Button, Card,


  CardActions, CardContent, CardHeader,


  Divider
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = localStorage.getItem('usrName')

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

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Termo de remoção de conta"
          title="Desativar Conta"
        />
        <Divider />
        <CardContent>
        <FormControl>
        <FormControlLabel          
                control={<Checkbox value="allowExtraEmails" color="primary" required/>}
                label= {`Eu ${user}, Estou ciente da exclusão da minha conta.`}
              />
              </FormControl>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="inherit"
            variant="outlined"
          >
            Desativar
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
