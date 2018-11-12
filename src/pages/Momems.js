import React, { Component } from 'react'


import momem from '../lib/momem-service';
import { withAuth } from '../lib/authContext';
import MomemCard from '../components/MomemCard'

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
      <div className='section-momems' >
        {momems.map(momem => {
          return <MomemCard key={momem._id} momem={momem} />
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
