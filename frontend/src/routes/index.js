import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Student from '../pages/Student';
import Dashboard from '../pages/Dashboard';
import Registration from '../pages/Registration';
import HelpOrder from '../pages/HelpOrder';
import Plan from '../pages/Plan';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';

// eslint-disable-next-line react/prefer-stateless-function
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/register" component={SignUp} />
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/registration" component={Registration} isPrivate />
        <Route path="/plan" component={Plan} isPrivate />
        <Route path="/student" component={Student} isPrivate />
        <Route path="/help-order" component={HelpOrder} isPrivate />
      </Switch>
    );
  }
}

export default Routes;
