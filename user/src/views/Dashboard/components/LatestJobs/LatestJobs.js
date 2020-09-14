import {
  Card,

  CardContent, CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Moneyresource from '../../../../helpers/MoneyResource'

import api from '../../../../Services/api';



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


  useEffect(() => {
    api
      .get('/latestJobsAll')
      .then(response => {
        setjobs(response.data);
      });
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Vagas recem cadastradas"
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
                    <TableCell>R$ {Moneyresource.convertStringToMoney(order.value)}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestJobs.propTypes = {
  className: PropTypes.string
};

export default LatestJobs;
