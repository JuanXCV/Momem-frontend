import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
class Private extends Component {
  render() {

    const {username, name, email, description} = this.props.user

    return (
      <div>
        <h1>Welcome {username}</h1>
        <h2>Name: {name} </h2>
        <h3>Email: {email} </h3>
        <p> Description: {description} </p>
      </div>
    )
  }
}

export default withAuth(Private);