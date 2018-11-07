import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
class Private extends Component {
  render() {
    return (
      <div>
        <h2>Hola estoy en el cosumer</h2>
        <h1>Welcome {this.props.user.username}</h1>
      </div>
    )
  }
}

export default withAuth(Private);