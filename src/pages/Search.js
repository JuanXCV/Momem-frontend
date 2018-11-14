import React, { Component } from 'react'
import momemService from '../lib/momem-service'
import MomemCard from '../components/MomemCard';

export default class Search extends Component {

  state = {
    inputMomem: "",
    momemsFiltered: []
  }

  handleChange = (e) => {
    const {value} = e.target
    momemService.list()
    .then(list => {
      let filtered = list.filter(item => {
        
        return item.content.toUpperCase().includes(value.toUpperCase()) || item.title.toUpperCase().includes(value.toUpperCase())
      })
      
      if(value === "") {
        filtered = [];
      }

      this.setState({
        inputMomem: value,
        momemsFiltered: filtered,
      })
    })
  }

  render() {
    const {inputMomem, momemsFiltered} = this.state

    return (
      <div className='search-momems'> 
        <div className='section' >
          <div className='search-bar field' >
            <div className='control control-search '>
              <input value={inputMomem} type="text" className='input input-search momem-search' placeholder='Search your MOMEM' onChange={this.handleChange}/>
            </div>
          </div>
        </div>
        {momemsFiltered.map(item => {
          return <MomemCard momem={item} key={item._id}/>
        })}
      </div>
    )
  }
}
