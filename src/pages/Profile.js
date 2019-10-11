import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';
import userService from '../lib/user-service'
import MomemCard from '../components/MomemCard'
import Loading from '../components/Loading'

class Private extends Component {

  state = {
    momems: [],
    user: null,
    isLoading: true,
  }

  render() {

    const {momems, isLoading} = this.state;
    
    if(isLoading){
      return <Loading/>
    }
    const {username, name, description, image, backgroundImage} = this.state.user

    return (
      <div>
        <img src={backgroundImage} alt="profile" className='profile-background'/>
        <div className='section private' >
          <div className= 'profile'>
            <img src={image} alt="profile" className='profile-img'/>
            <h1 className='title' >{name}</h1>
            <h2 className='subtitle' >@{username} </h2>
            <p>{description} </p>
          </div>
          <h3 className='subtitle' >Momems</h3>
          <hr/>
          {momems.map(momem => {
            return <MomemCard momem={momem} key={momem._id} />
          })}
          {momems.length<1 ? <Link to='/momem/create' > <h1 className='subtitle ' > This user has not momems yet </h1>  </Link> : ("")}
        </div>
      </div>
    )
  }

  componentDidMount() {
    const {id} = this.props.match.params

    userService.getUser(id)
    .then(user => {
      userService.getMomems(id)
      .then(momems => {
        this.setState({
          momems,
          user,
          isLoading: false,
        })
      })
      .catch(error => {
        console.error(error)
      })
    })
    .catch(error => {
      console.error(error)
    })

  }
}

export default withAuth(Private);