import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import momem from '../lib/momem-service';
import { withAuth } from '../lib/authContext';

class MomemDetail extends Component {

  state = {
    currentMomem: null,
    isLoading: true,
  }

  render() {

    const {isLoading, currentMomem} = this.state;
    const {user} = this.props
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
                  <Link to={`/profile/${currentMomem.owner._id}`} ><img src={currentMomem.owner.image} alt=""/></Link>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{currentMomem.title}</p>
                <p className="subtitle is-6">{currentMomem.owner.username}</p>
                <div className='is-grouped field wrap'>
                  {currentMomem.themes.map(item => {
                  return <p key={item._id} className='padding is-momem themes' >{item.name}</p>
                    })}
                </div>
              </div>
            </div>

            <div className="content">
              {currentMomem.content}
              <br/>
              <time dateTime="2016-1-1">{currentMomem.timestamps}</time>
            </div>
          </div>
        </div>
        <div className='section delete-button'> 
          {user._id === currentMomem.owner._id ?  <button onClick={this.handleClick} className='button is-danger padding'>DELETE MOMEM</button>: ""}
        </div>
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
      this.props.history.push('/private');
    })
    .catch(error => {
      console.error(error)
    })
  }
}

export default  withAuth(MomemDetail);
