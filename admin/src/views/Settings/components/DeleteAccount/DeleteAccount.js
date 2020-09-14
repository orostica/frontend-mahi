import {
  Button, Card,
  CardActions, CardContent, CardHeader,
  Divider
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../../Services/api';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const employer = localStorage.getItem('empName')
  const employerID = localStorage.getItem('empId')

  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen= (event) => {
    event.stopPropagation();
    setOpen(true);
    
  };

  async function handleExclude(){

    const data = {
      id:employerID
    }

      try {
        await api.put('empRemove', data );
  
        alert(`Conta Removida!`);
  
        localStorage.clear();

        history.push('/Login');
   
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
       
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">Desativação da Conta</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que desejar desativar a conta?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExclude} color="default">
            Sim
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained" >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>


        <CardHeader
          subheader="Termo de remoção de conta"
          title="Desativar Conta"
        />
        <Divider />
        <CardContent>
        <FormControl>
        <FormControlLabel          
                control={<Checkbox value="allowExtraEmails" color="primary" required/>}
                label= {`Estou ciente da exclusão da conta da empresa ${employer}.`}
              />
              </FormControl>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleOpen}
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
