import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyResource from '../../../../helpers/MoneyResource'

import api from '../../../../Services/api'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalValue = props => {
  const { className, ...rest } = props;
  const [total, setTotal] = useState(0);
  const classes = useStyles();
  
  const empId = localStorage.getItem('empId');

  useEffect(() => {
    api
      .get('/totalValues',{
        headers: {
          Authorization: empId
        }
      })
      .then(response => {
        setTotal(response.data);
      });
  }, [empId]);


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              TOTAL EM REMUNERAÇÕES
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              R$ {MoneyResource.convertIntegerToMoney(total)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalValue.propTypes = {
  className: PropTypes.string
};

export default TotalValue;
