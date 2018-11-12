import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import Momems from './Momems'

class Private extends Component {
  render() {

    const {username, name, description, image, backgroundImage} = this.props.user

    return (
      <div>
      <img src={backgroundImage} alt="profile" className='profile-background'/>
        <div className='section' >
          <div className= 'profile'>
            <img src={image} alt="profile" className='profile-img'/>
            <div className='logout' >
              <div onClick={this.handleLogOut} className='logout-button' > <img src="https://cdn.icon-icons.com/icons2/37/PNG/512/logout_3622.png" alt=""/> </div>
            </div>
            <h1 className='title' >{name}</h1>
            <h2 className='subtitle' >@{username} </h2>
            <p> Description: {description} </p>
          </div>
          <h3 className='subtitle' >Momems</h3>
          <hr/>
        </div>
        <Momems/>
      </div>
    )
  }

  handleLogOut = () => {
    this.props.logout()
  }
}

export default withAuth(Private);