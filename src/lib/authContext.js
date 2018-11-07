import React, { Component } from 'react'
import authService from './auth-service';

const { Provider, Consumer } = React.createContext();

export const withAuth = (Comp) => { 
  return (props) => {
    return <Consumer>
      {value => {
        return <Comp {...value} {...props} />
      }}
    </Consumer>
  }
}

export default class AuthContext extends Component {

  state = {
    isLogged: false,
    user: null,
    isLoading: true
  }

  componentDidMount() {
    authService.me()
    .then((user)=>{
      this.setState({
        user,
        isLoading : false,
        isLogged : true
      })
    })
    .catch((error)=>{
      this.setState({
        isLogged : false,
        user : null,
        isLoading : false
      })
    })
  }

  handleSetUser = (user) => {
    this.setState({
      user,
      isLogged : true
    })
  }

  handleLogOut = () =>{
    authService.logout()
    .then(()=>{
      this.setState({
        user : null,
        isLogged : false
      })
    })
    .catch((error)=>{
      console.log('Hay que manejar errores')
    })
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <h1>Loading...</h1> : <Provider value={{
      isLogged: this.state.isLogged,
      user: this.state.user,
      logout: this.handleLogOut,
      setUser: this.handleSetUser
    }}>
      {this.props.children}
    </Provider>
  }
}
