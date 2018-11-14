import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';
import userService from '../lib/user-service'
import MomemCard from '../components/MomemCard'

class Private extends Component {

  state = {
    momems: []
  }

  render() {

    const {username, name, description, image, backgroundImage} = this.props.user
    const {momems} = this.state;

    return (
      <div>
        <img src={backgroundImage} alt="profile" className='profile-background'/>
        <div className='section private' >
          <div className= 'profile'>
            <img src={image} alt="profile" className='profile-img'/>
            <div className='logout' >
              <div onClick={this.handleLogOut} className='logout-button' > <img src="/images/logout.png" alt=""/> </div>
            </div>
            <h1 className='title' >{name}</h1>
            <h2 className='subtitle' >@{username} </h2>
            <p> Description: {description} </p>
          </div>
          <h3 className='subtitle' >Momems</h3>
          <hr/>
          {momems.map(momem => {
            return <MomemCard momem={momem} key={momem._id} />
          })}
          {momems.length<1 ? <Link to='/momem/create' > <h1 className='subtitle button is-info' > + </h1>  </Link> : ("")}
        </div>
      </div>
    )
  }

  handleLogOut = () => {
    this.props.logout()
  }

  componentDidMount() {
    userService.getMomems(this.props.user._id)
    .then(momems => {
      this.setState({
        momems,
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export default withAuth(Private);