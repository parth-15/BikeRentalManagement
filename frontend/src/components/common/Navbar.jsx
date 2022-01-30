import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, CssBaseline, Box} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';

import {useAuthenticatedUser, useUpdateAuthenticatedUser} from '../../providers/AuthProvider';
import {AUTHTOKEN, MANAGER, USER} from '../../utils/constant';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Navbar() {
  const classes = useStyles();
  const updateAuthenticatedUser = useUpdateAuthenticatedUser();
  const authenticatedUser = useAuthenticatedUser();

  const logOut = () => {
    localStorage.removeItem(AUTHTOKEN);
    localStorage.removeItem(USER);
    updateAuthenticatedUser({});
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box className={classes.title}>
            <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
              Home
            </Button>
          </Box>

          {[USER, MANAGER].includes(authenticatedUser.role) && (
            <Button color="inherit" component={Link} to="/reserve">
              Reserves
            </Button>
          )}

          {authenticatedUser.role === MANAGER && (
            <Button color="inherit" component={Link} to="/manager">
              Manager panel
            </Button>
          )}

          {[USER, MANAGER].includes(authenticatedUser.role) && (
            <Button color="inherit" onClick={logOut}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div className={classes.appBarSpacer} />
    </div>
  );
}
