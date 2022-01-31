import {AppBar, Container, makeStyles, Tab, Tabs} from '@material-ui/core';
import {useState} from 'react';
import UserTab from '../../components/admin/user/UserTab';
import Navbar from '../../components/common/Navbar';

const useStyles = makeStyles({
  container: {marginTop: 40},
});

export default function Manager() {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Navbar />
      <Container className={classes.container}>
        <AppBar position="static" color="inherit">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Users" />
            <Tab label="Bikes" />
            <Tab label="Reserves" />
          </Tabs>
        </AppBar>
        {value === 0 && <UserTab />}
      </Container>
    </div>
  );
}
