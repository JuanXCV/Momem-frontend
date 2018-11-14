import React, { Component } from 'react'
import themeService from '../lib/theme-service'
import userService from '../lib/user-service'
import { withAuth } from '../lib/authContext';
import ThemeCard from '../components/ThemeCard'

class Filters extends Component {

  state = {
    themesFiltered: [],
    inputTheme: "",
    errorMessage: null,
  }

  handleChange = (e) => {
    const {value} = e.target
    themeService.list()
    .then(list => {
      let filtered = list.filter(item => {
        
        return item.name.toUpperCase().includes(value.toUpperCase())
      })
      
      if(value === "") {
        filtered = [];
      }

      this.setState({
        inputTheme: value,
        themesFiltered: filtered,
        errorMessage: null,
      })
    })
  }

  handleAddTheme = (newTheme) => {
    const {filters} = this.props.user
    let coincidence = false;
    filters.forEach(item => {
      if(item.theme.name === newTheme.name){
        coincidence = true
      }
    })

    if(!coincidence){
      userService.addFilter(newTheme._id)
      .then(user => {
        this.props.setUser(user)
        
        this.setState({
          inputTheme: "",
          themesFiltered: [],
        })
      })
    } else {
      this.setState({
        inputTheme: "",
        themesFiltered: [],
        errorMessage: 'Filtered yet added'
      })
    }
  }

  handleDeleteTheme = (themeId) => {
    userService.deleteFilter(themeId)
    .then(user => {
      this.props.setUser(user)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const {inputTheme, themesFiltered, errorMessage} = this.state
    const {filters} = this.props.user;
    return (
      <div className='section filters' >
        <div className='search-bar field' >
          <div className='control control-search'>
            <input value={inputTheme} type="text" className='input input-search' placeholder='Add a filter' onChange={this.handleChange}/>
          </div>
          {errorMessage ? <p>{errorMessage}</p> : "" }
          {themesFiltered.map(item => {
            return <button  onClick={(e)=>{ e.preventDefault(); this.handleAddTheme(item)}} className='button is-small' key={item._id} >{item.name}</button>
          })}
        </div>
        {filters.map((item, idx) => {
          return <ThemeCard key={item.theme._id} filter={item} onDelete={this.handleDeleteTheme}/>

        })}
      </div>
    )
  }
}

export default withAuth(Filters);
