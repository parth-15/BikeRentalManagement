import React from 'react';
import {Switch} from 'react-router-dom';
import AppRoute from './components/common/AppRoute';

import Navbar from './components/common/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import ReserveTab from './pages/reserve/ReserveTab';
import Signup from './pages/signup/Signup';
import AuthProvider from './providers/AuthProvider';
import {AUTHENTICATED, GUEST} from './utils/constant';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        <AppRoute restrictedTo={GUEST} exact path="/login" component={Login} />

        <AppRoute restrictedTo={GUEST} exact path="/signup" component={Signup} />

        <AppRoute restrictedTo={AUTHENTICATED} exact path="/" component={Home} />

        <AppRoute restrictedTo={AUTHENTICATED} exact path="/reserve" component={ReserveTab} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
