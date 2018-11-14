import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import Momems from './Momems';

class Home extends Component {

  state = {
    filters: [],
    currentFilter: "",
    isLoading: true,
    errorMessage: null,
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
    this.setState({
      currentFilter: filter,
    })
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
          <Momems filter={currentFilter} />
        </div>
      )}
      </div>
    )
  }
}

export default withAuth(Home);