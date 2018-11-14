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
      <div className='momem-detail'>

        <div className="card">
          <div className="card-image">
            <figure className="image is-4by2">
              <img src={currentMomem.image} alt=""/>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={currentMomem.owner.image} alt=""/>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{currentMomem.title}</p>
                <p className="subtitle is-6">{currentMomem.owner.username}</p>
              </div>
            </div>

            <div className="content">
              {currentMomem.content}
              <br/>
              <time dateTime="2016-1-1">{currentMomem.timestamps}</time>
            </div>
          </div>
        </div>
        <button onClick={this.handleClick} className='button'>delete</button>
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

      this.setState({
        currentMomem: null,
        isLoading: true,
      })
      this.props.history.push('/momems');
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export default  withAuth(MomemDetail);
