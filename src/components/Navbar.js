import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';
class Navbar extends Component {
  render() {  
    const { isLogged } = this.props;
    return (
      <div>
        {isLogged ? (
        <nav className="navbar navbar-bottom" role="navigation" aria-label="main navigation">
        
          <div className="navbar-brand">
            <div className='navbar-item' > <Link to='/momem' > <img src="https://cdn.icon-icons.com/icons2/1517/PNG/512/homeminimono_105801.png" alt="home"/> </Link> </div>
            <div className='navbar-item' > <Link to='/momem' > <img src="http://www.clker.com/cliparts/Q/l/L/B/F/a/search-icon-md.png" alt="search"/> </Link> </div>
            <div className='navbar-item' > <Link to='/momem' > <img src="https://cdn.icon-icons.com/icons2/1402/PNG/512/confirm-notification_96974.png" alt="notifications"/> </Link> </div>
            <div className='navbar-item' > <Link to='/momem' > <img src="https://static.thenounproject.com/png/72961-200.png" alt="filters"/> </Link> </div>
          </div>
        </nav>

        ) : ( "" )}
      </div>
    )
  }
}

export default withAuth(Navbar);