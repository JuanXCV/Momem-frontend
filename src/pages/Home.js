import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import Momems from './Momems';
import Promise from 'bluebird'

class Home extends Component {

  constructor(props) {
    super(props);

    this.setStateAsync = Promise.promisify(this.setState);

    this.state = {
      filters: [],
      currentFilter: "",
      isLoading: true,
      errorMessage: null,
    }

  }

  

  componentDidMount() {
    const {user} = this.props
    if(user.filters.length<1){
      this.setState({
        filters: user.filters,
        currentFilter: user.filters[0],
        isLoading: false,
        errorMessage: "Add some filter"
      })
    } else {
      this.setState({
        filters: user.filters,
        currentFilter: user.filters[0],
        isLoading: false,
        errorMessage: null,
      })
    }
  }

  handleFilter = (filter) => {
    this.setStateAsync({
      currentFilter: filter,
    })
    .then(succes => {

      this.state.callback();
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleCallback = (Callback) => {
    this.setState({
      callback: Callback,
    })
  }

  componentDidUpdate() {
  }

  render() {
    const {filters, currentFilter, isLoading, errorMessage} = this.state;
    if(isLoading){
      return <h1>is loading...</h1>
    }
    return (
      <div className='home'>
      {errorMessage ? (<p>{errorMessage}</p>
      ) : ( 
        <div>
          <div className='filters-bar' >
            {filters.map((item) => {
              return <p onClick={() => {this.handleFilter(item)}} key={item._id} className='button is-momem padding title' >{item.theme.name}</p>
            })}
          </div>
          <Momems filter={currentFilter} onCallback={this.handleCallback} />
        </div>
      )}
      </div>
    )
  }
}

export default withAuth(Home);