import React, { Component } from 'react'

import momem from '../lib/momem-service';
import { withAuth } from '../lib/authContext';

class Momem extends Component {

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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={title} onChange={this.handleChange}/>
          <label>Content :</label>
          <input type="text" name="content" value={content} onChange={this.handleChange} />
          <label>Image: </label>
          <input type="text" name="image" value={image} onChange={this.handleChange} />
          <input type="submit" value="MO!" />
        </form>
      </div>
    )
  }
}

export default withAuth(Momem);
