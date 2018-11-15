import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Welcome extends Component {
  render() {
    return (
      <div className='section welcome'>
        <img src="/images/momem.jpg" alt=""/>
        <p className='title white' >INFORMATION <br/> IS  POWER</p>
        <div className="is-grouped center">
          <div className="control">
            <Link to='/login' className="button subtitle black">Accede</Link>
          </div>
          <div className="control">
            <Link to='signup' className="button subtitle black">Registrate</Link>
          </div>
        </div>
      </div>
    )
  }
}
