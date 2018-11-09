import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import momem from '../lib/momem-service';
import { withAuth } from '../lib/authContext';

class Momems extends Component {

  state = {
    momems: [],
    isLoading: true,
  }


  render() {
    const {isLoading, momems} = this.state;
    if(isLoading) {
      return <h1>is loading...</h1>
    }

    return (
      <div>
        {momems.map(momem => {
          return <div key={momem._id} >
           <Link to={`momem/${momem._id}`} > <h1> {momem.title} </h1> </Link>
            <p> {momem.content} </p>
            <p> {momem.image} </p>
            <p> {momem.owner.name} </p>
          </div>
        })}
      </div>
    )
  }

  componentDidMount() {

    momem.list()
    .then(momemList => {
      this.setState({
        isLoading: false,
        momems: momemList,
      })
    })
    .catch(error => {
      console.log(error)
    })

  }
}

export default  withAuth(Momems);
