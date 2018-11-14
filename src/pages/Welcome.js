import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Welcome extends Component {
  render() {
    return (
      <div className='section welcome'>
        <img src="/images/momem.jpg" alt=""/>
        <p className='title white' >INFORMATION <br/> IS  POWER</p>
        <div class="is-grouped center">
          <div class="control">
            <Link to='/login' class="button subtitle black">Accede</Link>
          </div>
          <div class="control">
            <Link to='signup' class="button subtitle black">Registrate</Link>
          </div>
        </div>
      </div>
    )
  }
}
