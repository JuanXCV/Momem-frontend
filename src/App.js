import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MomemCreate from './pages/MomemCreate'
import Momems from './pages/Momems'
import MomemDetail from './pages/MomemDetail'

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
            </Switch>
          </div>
        </div>
      </AuthContext>
    )
  }
}

export default App;
