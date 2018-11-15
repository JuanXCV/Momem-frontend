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
            <div className='navbar-item' > <Link to='/momems' > <img src="/images/home.png" alt="home"/> </Link> </div>
            <div className='navbar-item' > <Link to='/search' > <img src="/images/search.png" alt="search"/> </Link> </div>
            <div className='navbar-item' > <Link to='/notifications' > <img src="/images/notifications.png" alt="notifications"/> </Link> </div>
            <div className='navbar-item' > <Link to='/filters' > <img src="/images/filters.png" alt="filters"/> </Link> </div>
          </div>
        </nav>

        ) : ( "" )}
      </div>
    )
  }
}

export default withAuth(Navbar);