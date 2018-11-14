import React, { Component } from 'react'
import momem from '../lib/momem-service';
import MomemCard from '../components/MomemCard'

class Momems extends Component {

  state = {
    momems: [],
    isLoading: true,
    isUpdated: false,
  }


  render() {

    const {isLoading, momems, errorMessage, isUpdated} = this.state;
    if(isLoading || isUpdated) {
      return <h1>is loading...</h1>
    }
    return (
      
      <div>

        {errorMessage ? (<p>{errorMessage}</p>
      ) : ( 
        <div className='sections-momems'>
          {momems.map(momem => {
            return <MomemCard key={momem._id} momem={momem} />
          })} 
        </div>
      )}
      </div>
    )
  }

  componentDidMount() {
    this.getMomems();
    this.props.onCallback(this.getMomems);
  }

  getMomems = () => {
    const {filter} = this.props;
    let momemList = []
    let promises = []
    if(filter.fonts.length<1){
      this.setState({
        isLoading: false,
        momems: [],
        errorMessage: 'Add some fonts'
      })
    } else {
      filter.fonts.forEach(item => {
        promises.push(
          momem.getMomemsByFont(item.font, filter.theme._id)
          .then(momemFiltered => {
            momemFiltered.forEach(momem => {
              momemList.push(momem)
            })

          })
          .catch(error => {
            console.log(error)
          })
        )
        
      })
      Promise.all(promises)
      .then(succes => {
        
        this.setState({
          isLoading: false,
          momems: momemList,
        })
        
      })
    }
  }
}

export default  Momems;
