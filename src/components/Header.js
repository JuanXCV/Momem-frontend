import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { withAuth } from '../lib/authContext';

class Header extends Component {

  render() {  
    const { isLogged, location} = this.props;
    return (
      <div>
        {isLogged && location.pathname !== '/private' && !location.pathname.includes('profile') ? (
        <nav className="navbar navbar-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand navbar-header">
            <div className='navbar-item' > <Link to='/private' > <img src="/images/private.png" alt="profile"/> </Link> </div>
            {location.pathname === '/momems' ? <p className='subtitle'>HOME</p> : ""}
            {location.pathname === '/search' ? <p className='subtitle'>SEARCH</p> : ""}
            {location.pathname === '/filters' ? <p className='subtitle'>FILTERS</p> : ""}
            {location.pathname === '/momem/create' ? <p className='subtitle'>CREATE A MOMEM</p> : ""}
            <div className='navbar-item' > <Link to='/momem/create' > <img src="/images/add.svg" alt="add momem"/> </Link> </div>
          </div>
        </nav>

        ) : ( "" )}
      </div>
    )
  }
}

export default withAuth(withRouter(Header));
