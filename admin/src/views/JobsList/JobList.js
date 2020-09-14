import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { JobsTable } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const JobList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
      <h1 className="MuiTypography-h3 mb-2">Vagas</h1>
        <JobsTable/>
      </div>
    </div>
  );
};

export default JobList;
