import React, { Component } from 'react'

import momem from '../lib/momem-service';
import { withAuth } from '../lib/authContext';

class MomemDetail extends Component {

  state = {
    currentMomem: null,
    isLoading: true,
  }

  render() {

    const {isLoading, currentMomem} = this.state;
    
    if(isLoading) {
      return <h1>is loading...</h1>
    }

    return (
      <div> 
        <h1> {currentMomem.title} </h1>
        <p> {currentMomem.content} </p>
        <p> {currentMomem.image} </p>
        <p> author: {currentMomem.owner.name} </p>
        <button onClick={this.handleClick} >delete</button>
      </div>
    )
  }

  componentDidMount() {
    const {id} = this.props.match.params
    momem.detail(id)
    .then(item => {
      
      this.setState({
        currentMomem: item,
        isLoading: false,
      })
    })
  }

  handleClick = () => {
    const {currentMomem} = this.state

    momem.delete(currentMomem._id)
    .then(result => {
      console.log('borrado')

      this.setState({
        currentMomem: null,
        isLoading: true,
      })
      this.props.history.push('/momem');
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export default  withAuth(MomemDetail);
