import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MomemCard extends Component {
  render() {
    const {momem} = this.props;

    return (
      <div className="card momem-card" style={{backgroundImage: `url('${momem.image}')` }}>
        <div className="card-content momem-content" >
          <div className="media">
            <div className="media-content">
              <Link to={`momem/${momem._id}`} > <p className="title is-4 white">{momem.title}</p> </Link>
              <p className="subtitle is-6 white">{momem.owner.name}</p>
            </div>
          </div>

          <div className="content">
          </div>
        </div>
      </div>
    )
  }
}

export default MomemCard;
