import {
  Avatar, Button, Card,

  CardActions, CardContent,



  Divider, Grid, Typography
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import api from '../../../../Services/api';


const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom:12
  },
  title: {
    paddingRight:150,
    paddingLeft:150
    
  },
  text:{
    width: '100%'
  }
}));

const UserCard = props => {
  const { className, user, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();
  const employer = localStorage.getItem('empName')


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen= (event, selectedUser) => {
    event.stopPropagation();
    setOpen(true);
    setSelectedUser(selectedUser);
  };

  const handleMail = () => {
  

    api.post('/mail', {	destinatario:selectedUser.email,
                        mensagem:message,
                        remetente:employer}).then(function(response){
                          alert("E-mail Enviado com Sucesso")
                        })

                        setOpen(false);    
    
  };

  const handleMessage = event => {
		const inputMessage = event.target.value;
		setMessage(inputMessage);
	};

  return (
    <div>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
       
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">Informações do Usuário</DialogTitle>
        <div className='m-6'>

       
        Nome: <Typography
          align="left"
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        e-mail: <Typography
          align="left"
          gutterBottom
          variant="h6"
        >
          {user.email}
        </Typography>
        Telefone: <Typography
          align="left"
          gutterBottom
          variant="h6"
        >
          {user.phone}
        </Typography>
        Residencia: <Typography
          align="left"
          gutterBottom
          variant="h6"
        >
          {user.city + ' - ' + user.state}
        </Typography>
        Curso: <Typography
          align="left"
          gutterBottom
          variant="h6"
        >
          {user.course}
        </Typography>

        Conhecimento: <Typography
          align="left"
          gutterBottom
          variant="h6"
        >
          {user.knowledge}
        </Typography>

        </div>

    <div className='m-6'>
        <TextField
            autoFocus
            margin="dense"
            multiline
            rows={4}
            id="email"
            label="Mensagem"
            type="email"
            value={message}
            onChange={handleMessage}
            fullWidth
          />

    </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={handleMail} variant="contained" color="primary">
            <MailIcon className="mr-2" />
              E-mail
            </Button>
        </DialogActions>
      </Dialog>

    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Avatar
        alt={user.name}
        className={classes.avatar}
        src={user.avatar}
      />
        <Typography
          align="left"
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          align="left"
          variant="body1"
        >
          {user.knowledge}
        </Typography>
      </CardContent>
      <Divider />

      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <SearchIcon className={classes.statsIcon} />
            <Typography>
              Buscando: {user.status}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            

            <Button onClick={event => handleOpen(event, user)} variant="contained" color="primary">
            <AddIcon className="mr-2" />
              Informações
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
    </div>
  );
};

UserCard.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default UserCard;
