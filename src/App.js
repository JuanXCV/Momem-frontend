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
import MomemDetail from './pages/MomemDetail'
import Filters from './pages/Filters'
import Home from './pages/Home'
import Search from './pages/Search'
import AuthContext from './lib/authContext';
import Welcome from './pages/Welcome'

class App extends Component {
  render() {
    return (
      <AuthContext history= {this.props.history}>
        <div className="container">
          <div>
            <Header />
            <Navbar />
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/momem/create" component={MomemCreate} />
              <PrivateRoute exact path="/momems" component={Home} />
              <PrivateRoute exact path="/search" component={Search} />
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
