import React, { Component } from 'react';
import { Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Private from './pages/Private';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MomemCreate from './pages/MomemCreate'
import MomemDetail from './pages/MomemDetail'
import Filters from './pages/Filters'
import Home from './pages/Home'
import Search from './pages/Search'
import AuthContext from './lib/authContext';
import Welcome from './pages/Welcome'
import AnonRoute from './components/AnonRoute'
import Notifications from './pages/Notifications'
import Loading from './components/Loading';

class App extends Component {
  render() {
    return (
      <AuthContext history= {this.props.history}>
        <div className="container">
          <div>
            <Header />
            <Navbar />
            <Switch>
              <AnonRoute exact path="/" component={Welcome} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/momem/create" component={MomemCreate} />
              <PrivateRoute path="/momems" component={Home} />
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/notifications" component={Notifications} />
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
