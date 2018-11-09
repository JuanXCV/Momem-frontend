import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';

class Signup extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    errorMessage: ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;

    auth.signup({ username, email, password })
      .then( (user) => {
        console.log(user)
        this.setState({
            username: "",
            email: "",
            password: "",
        });
        this.props.setUser(user);
        this.props.history.push('/private');
      })
      .catch(({response}) => {
        // if (response.data.error === "empty-fields") {
        //   this.setState({errorMessage: "Put some info in the fields bro!!!"})
        // }

        switch(response.data.error) {
          case 'empty-fields': this.setState({errorMessage: 'Put some info in the fields bro!!!'});
            break;
          default :
        }

  
        //error: 'empty-fields'
        //error: 'username-not-unique'
        //error: 'email-not-unique'
      })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, email, errorMessage} = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>
          <label>Email :</label>
          <input type="email" name="email" value={email} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>
        <div>
          {errorMessage}
        </div>

        <p>Already have account? 
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    )
  }
}

export default withAuth(Signup);


