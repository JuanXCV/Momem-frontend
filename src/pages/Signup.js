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

        // switch(response.data.error) {
        //   case 'empty-fields': this.setState({errorMessage: 'Put some info in the fields bro!!!'});
        //     break;
        //   default :
        // }

  
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
      <form onSubmit={this.handleFormSubmit} className='section auth'>
        <h1 className='title titulo' >Registrate</h1>
        <div className='field'>
          <div className='control margin-bottom' >
            <input  placeholder='Your username' className='input' type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='field'>
          <div className='control margin-bottom' >
            <input placeholder='Your e-mail' className='input' type="email" name="email" value={email} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='field' >
          <div className='control margin-bottom' >
            <input placeholder='Your password' className='input' type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
        </div>
        <div className='control margin-bottom' >
          <input className='button is-momem title' type="submit" value="SIGN UP" />
        </div>
        {errorMessage ? `${errorMessage}` : ""}
        <div className='section'>
          <p> Already have an account?<Link to='/login' > <button className='button is-text' >LOGIN</button> </Link></p>
          
        </div>
      </form>
    )
  }
}

export default withAuth(Signup);


