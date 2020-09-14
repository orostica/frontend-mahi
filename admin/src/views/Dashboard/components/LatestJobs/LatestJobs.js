import {
  Button, Card,
  CardActions,
  CardContent, CardHeader,
  Divider,
  Link, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import api from '../../../../Services/api';

import MoneyResource from '../../../../helpers/MoneyResource'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestJobs = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [jobs, setjobs] = useState([]);

  const empId = localStorage.getItem('empId');

  useEffect(() => {
    api
      .get('/latestJobs',{
        headers: {
          Authorization: empId
        }
      })
      .then(response => {
        setjobs(response.data);
      });
  }, [empId]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Minhas Vagas"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Remuneração</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map(order => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{order.title}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell>R$ {MoneyResource.convertStringToMoney(order.value)}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
      <Link href="/jobs">
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Ver Todas <ArrowRightIcon />
        </Button>
      </Link>
      </CardActions>
    </Card>
  );
};

LatestJobs.propTypes = {
  className: PropTypes.string
};

export default LatestJobs;
