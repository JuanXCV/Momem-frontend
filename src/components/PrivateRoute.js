import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import { withAuth } from '../lib/authContext';

class PrivateRoute extends Component {
  render() {
    const {path, component:Component, isLogged, ...rest} = this.props
    return (
      <Route  {...rest } path={path} render={(props)=>{
        return isLogged ? <Component {...props} /> : <Redirect to={'/login'} />
      }} />
    )
  }
}

export default withAuth(PrivateRoute);
