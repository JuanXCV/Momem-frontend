import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';
class Navbar extends Component {
  render() {  
    const { isLogged } = this.props;
    return (
      <div>
        {isLogged ? <div>
          <p>username: {this.props.user.username}</p>
          <p onClick={this.props.logout}>Logout</p>
          <Link to='/momem/create'>New Momem</Link>
        </div> : <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      }
      </div>
    )
  }
}

export default withAuth(Navbar);