import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';
class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
      this.props.history.push('/private'); 
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} className='section'>
        <h1 className='title' >LOG IN</h1>
        <div className='field'>
          <label>Username:</label>
          <div className='control' >
            <input className='input' type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='field' >
          <label>Password:</label>
          <div className='control' >
            <input className='input' type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
        </div>
        <div className='control' >
          <input className='button is-link' type="submit" value="LOG IN" />
        </div>
      </form>
    )
  }
}

export default withAuth(Login);