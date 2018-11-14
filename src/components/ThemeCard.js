import React, { Component } from 'react';
import themeService from '../lib/theme-service';
import userService from '../lib/user-service';
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';

class ThemeCard extends Component {

  state = {
    isVisible: false,
    inputFont: "",
    fontsFiltered: [],
    errorMessage: null,
    fonts: []
  }

  handleClick = () => {
    const {isVisible} = this.state

    if(isVisible){
      this.setState({
        isVisible: false,
      })
    } else {
      this.setState({
        isVisible: true,
      })
    }
  }

  handleChange = (e) => {
    const {value} = e.target
    const {theme} = this.props.filter;
    themeService.getFontsByTheme(theme._id)
    .then(list => {
      let filtered = list.filter(item => {
        return item.font.username.toUpperCase().includes(value.toUpperCase())
      })
      
      if(value === "") {
        filtered = [];
      }

      this.setState({
        inputFont: value,
        fontsFiltered: filtered,
        errorMessage: null,
      })
    })
  }

  handleAddFont = (newFont) => {
    const {theme} = this.props.filter;
    const {fonts} = this.state;
    let coincidence = false;
    fonts.forEach(item=> {
      if(item.font.name === newFont.font.username){
        coincidence = true;
      } 
    })

    if(!coincidence){
      
      userService.addFont(theme._id, newFont._id)
      .then(user => {
        this.props.setUser(user)
        this.updateFonts()
      })
      .catch(error => {
        console.log(error)
      })

    } else {
      this.setState({
        inputFont: "",
        fontsFiltered: [],
        errorMessage: "Font yet added",
        fonts,
      })
    }

  }

  componentDidMount() {
    this.updateFonts()
  }

  updateFonts = () => {
    const {fonts} = this.props.filter
    let newFonts = []
    let promises = []
    fonts.forEach(item => {
      promises.push(
        themeService.getFontById(item._id)
        .then(font => {
          newFonts.push(font)

        })
        .catch(error => {
          console.log(error)
        })
      )
    })

    Promise.all(promises)
    .then(succes => {
      this.setState({
        fonts: newFonts,
        inputFont: "",
        fontsFiltered: [],
      })
    })
  }

  render() {
    const {theme} = this.props.filter;
    const {isVisible, inputFont, fontsFiltered, errorMessage, fonts} = this.state;
    return (
      <div>
        <div className="card theme-card" >
          <div className="card-content">
            <p className="subtitle" onClick={this.handleClick}>
              {theme.name}
            </p>
          </div>
          <div className='card-content'>
            <p  onClick={() => {this.props.onDelete(theme._id)}} className='subtitle button is-danger ' >-</p>
          </div>
        </div>
        {isVisible ? (
          <div className='fonts section card'>
            <label className="label">Fonts:</label>
            <div className='field is-grouped wrap'>
              {fonts.length>0 ? (
                fonts.map((item, idx) => {
                  return <div className='control' key={idx} > <Link to={`/profile/${item.font._id}`} > <p className='button padding font-card'> <img className='font-image'  src={item.font.image} alt=""/> {item.font.username}</p> </Link> </div>
                })
              ) : (
                ""
              )}
            </div>
            <div className='field has-addons'> 
              <div className='control control-search'>
                <input value={inputFont} type="text" className='input input-search' placeholder='Add a font' onChange={this.handleChange}/>
              </div>
              <div className='control'>
                <button onClick={this.fontSubmit}  className='button is-momem'> + </button>
              </div>
            </div>
              {errorMessage ? <p>{errorMessage}</p> : "" }
              {fontsFiltered.map(item => {
                return <button  onClick={(e)=>{ e.preventDefault(); this.handleAddFont(item)}} className='button is-small' key={item._id} >{item.font.username}</button>
              })}
          </div>
          
          ) : (
            ""
            )}
      </div>
    )
  }
}

export default withAuth(ThemeCard);
