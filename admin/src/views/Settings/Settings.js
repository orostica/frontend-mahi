import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountDetails, Password , DeleteAccount } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="MuiTypography-h3 m-2">Configurações</h1>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={7}
          xs={12}
        >
         <AccountDetails />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
        >
          <Password />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
        >
          <DeleteAccount />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
