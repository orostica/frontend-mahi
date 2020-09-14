import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/styles';
import { SearchInput } from 'components';
import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import { UserCard } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },searchInput: {
    marginRight: theme.spacing(1)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  }
}));



const UserList = (props) => {
  const [busca, setBusca] = useState();

  useEffect(() => {
    api
      .get('/usersTo',{
        params:{
           busca
        }
      })
      .then(response => {
        setUsers(response.data);
      });
  }, [busca]);

  async function handleChangePage(_event, page) {
	}
  
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  

  return (
    <div className={classes.root}>
      <h1 className="MuiTypography-h3">Usuários/Estudantes</h1>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Busca"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

    </div>

      
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {users.map(user => (
            <Grid
              item
              key={user.id}
              lg={4}
              md={6}
              xs={12}
            >
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
      <Pagination
				count={Math.ceil(users.length / users.length)}
				onChange={handleChangePage}
				showFirstButton
				showLastButton
				style={{
					alignSelf: 'center'
				}}
			/>
      </div>
    </div>
  );
};

export default UserList;
