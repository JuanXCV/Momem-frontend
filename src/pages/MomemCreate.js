import React, { Component } from 'react'

import momem from '../lib/momem-service';
import { withAuth } from '../lib/authContext';

class MomemCreate extends Component {

  state = {
    title: "",
    content: "",
    image: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, content, image } = this.state;

    const momemData = {
      title,
      content,
      image
    }

    momem.create(momemData)
      .then((result) => {
        this.setState({
          title: "",
          content: "",
          image: "",
        });
        this.props.history.push('/momem');
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { title, content, image } = this.state;
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
        <div className='control' >
          <input className='button is-primary' type="submit" value="MO!" />
        </div>
      </form>
    )
  }
}

export default withAuth(MomemCreate);
