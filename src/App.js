import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Private from './pages/Private';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MomemCreate from './pages/MomemCreate'
import Momems from './pages/Momems'
import MomemDetail from './pages/MomemDetail'
import Filters from './pages/Filters'

import AuthContext from './lib/authContext';

class App extends Component {
  render() {
    return (
      <AuthContext history= {this.props.history}>
        <div className="container">
          <div>
            <Header />
            <Navbar />
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/momem/create" component={MomemCreate} />
              <PrivateRoute exact path="/momem" component={Momems} />
              <PrivateRoute path="/momem/:id" component={MomemDetail} />                
              <PrivateRoute path="/private" component={Private} />
              <PrivateRoute path="/profile/:id" component={Profile} />
              <PrivateRoute path="/filters" component={Filters} />
            </Switch>
          </div>
        </div>
      </AuthContext>
    )
  }
}

export default App;
