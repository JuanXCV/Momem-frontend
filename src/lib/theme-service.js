import axios from 'axios';

class Theme {

  constructor() {
    this.theme = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  list() {
    return this.theme.get('/theme/list')
    .then(({ data }) => data)
     
  };

  getFontById(id) {
    return this.theme.get(`/theme/fonts/font/${id}`)
    .then(({ data }) => data)
     
  };

  getFontsByTheme(id) {
    return this.theme.get(`/theme/fonts/${id}`)
    .then(({ data }) => data)
     
  };

  create(name) {
    return this.theme.post('/theme', {name})
    .then(({ data }) => data)
    
  };

  delete(id) {
    return this.theme.delete(`/theme/${id}`)
    .then(({ data }) => data)
    
  };



}

const theme = new Theme();

export default theme;