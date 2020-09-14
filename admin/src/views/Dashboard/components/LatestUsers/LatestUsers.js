import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import api from '../../../../Services/api';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  avatar: {
    marginRight: 12
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestUsers = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/latestUsers').then(response => {
      setUsers(response.data);
    });
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subtitle={`${users.length} in total`}
        title="Usuários/Estudantes recém cadastrados"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {users.map((user, i) => (
            <ListItem divider={i < users.length - 1} key={user.id}>
              <Avatar
                alt={user.name}
                className={classes.avatar}
                src={user.avatar}
              />

              <ListItemText primary={user.name} secondary={user.status} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Link href="/users">
          <Button color="primary" size="small" variant="text">
            Ver Todos <ArrowRightIcon />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

LatestUsers.propTypes = {
  className: PropTypes.string
};

export default LatestUsers;
