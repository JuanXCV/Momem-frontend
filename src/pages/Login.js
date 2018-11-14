import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMessage: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
      this.props.history.push('/private'); 
    })
    .catch(({response}) => {
      if (response.data.error ) {
        this.setState({errorMessage: response.data.error})
      }
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} className='section auth'>
        <h1 className='title titulo' >Accede</h1>
        <div className='field'>
          <div className='control margin-bottom' >
            <input placeholder='Your username' className='input' type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='field' >
          <div className='control margin-bottom' >
            <input placeholder='Your password' className='input' type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
        </div>
        {errorMessage ? `${errorMessage}` : ""}
        <div className='control margin-bottom' >
          <input className='button is-momem title' type="submit" value="LOGIN" />
        </div>
        <div className='section'>
        <p>Are you new?<Link to='/signup' > <button className='button is-text' >SIGN UP</button> </Link></p>
        </div>
      </form>
    )
  }
}

export default withAuth(Login);