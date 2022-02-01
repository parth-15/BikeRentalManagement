import {Box, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Error404() {
  const classes = useStyles();

  return (
    <Box my={15} className={classes.container}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Page not found</Typography>
    </Box>
  );
}
