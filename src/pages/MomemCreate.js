import React, { Component } from 'react'

import momem from '../lib/momem-service';
import { withAuth } from '../lib/authContext';
import themeService from '../lib/theme-service'

class MomemCreate extends Component {

  state = {
    title: "",
    content: "",
    image: "",
    theme: "",
    themesFiltered: null,
    themes: [],
    errorMessage: null,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, content, image, themes } = this.state;
    let newThemes = []
    themes.forEach(item => {
      newThemes.push(item._id)
    })

    const momemData = {
      title,
      content,
      image,
      themes: newThemes,
    }

    momem.create(momemData)
      .then((result) => {
        this.setState({
          title: "",
          content: "",
          image: "",
        });
        this.props.history.push('/momems');
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleChangeTheme = (event) => {  
    const {name, value} = event.target;

    themeService.list()
    .then(list => {
      let filtered = list.filter(item => {
        
        return item.name.toUpperCase().includes(value.toUpperCase())
      })
      
      if(value === "") {
        filtered = null;
      }

      this.setState({
        [name]: value,
        themesFiltered: filtered,
        errorMessage: null,
      });

    })
    .catch(error => {
      console.log(error)
    })    

  }

  handleAddTheme = (theme) => {
    const {themes} = this.state;
    let coincidence = false;
    themes.forEach(item=> {
      if(item.name === theme.name){
        coincidence = true;
      } 
    })

    if(!coincidence){
      themes.push(theme)
      this.setState({
        themes,
        theme: "",
        themesFiltered: null,
      })
    } else {
      this.setState({
        themes,
        theme: "",
        themesFiltered: null,
        errorMessage: 'Theme yet added'
      })
    }

  }

  themeSubmit = (theme) => {
    themeService.create(theme)
    .then(succes => {
      this.handleAddTheme(succes)

    })
    .catch(error => {
      console.log(error)
    })
  }

  handleDelete = (theme) => {
    const {themes} = this.state;
    themes.forEach((item, idx) => {
      if(item._id === theme._id){
        themes.splice(idx, 1)
      }
    })

    this.setState({
      themes,
      theme: "",
      themesFiltered: null,
    })
  }

  render() {
    const { title, content, image, theme, themesFiltered, themes, errorMessage} = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} className='momem-create section' >
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" placeholder="Escriba un título" name="title" value={title} onChange={this.handleChange} />
          </div>
        </div>

        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <input className="input" type="text" placeholder="Escriba un articulo" name="content" value={content} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input className="input" type="text" placeholder="Ponga un enlace a una imagen" name="image" value={image} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='field'>
          <label className="label">Themes:</label>
          <div className='field is-grouped wrap'>
          {themes.length>0 ? (
            themes.map((item, idx) => {
              return <div className='control' key={idx} > <p  onClick={(e)=> {e.preventDefault(); this.handleDelete(item)}}  className='button is-link is-small padding'>{item.name}</p> </div>
            })
          ) : (
            ""
          )}
          </div>
          <div className="field has-addons">
            <div className="control">
              <input className="input" type="text" placeholder="Elija un tema" name="theme" value={theme} onChange={this.handleChangeTheme}/>
            </div>
            <div className='control'>
              <button onClick={(e) => {e.preventDefault(); this.themeSubmit(theme)}}  className='button is-momem title'> + </button>
            </div>
          </div>
          {errorMessage ? <p>{errorMessage}</p> : "" }
          { themesFiltered ? (
            
            themesFiltered.map(item => {
              return <button  onClick={(e)=>{ e.preventDefault(); this.themeSubmit(item.name)}} className='button is-small' key={item._id} >{item.name}</button>
            })
            
          ) : (
            
            ""
          )}
        </div>
        <div className='field' >
          <div className='control' >
            <input className='button is-momem title' type="submit" value="MO!" />
          </div>
        </div>
      </form>
    )
  }
}

export default withAuth(MomemCreate);
