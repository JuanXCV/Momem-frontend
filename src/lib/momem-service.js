import axios from 'axios';

class Momem {

  constructor() {
    this.momem = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  list() {
    return this.momem.get('/momem/list')
      .then(({ data }) => data)
      
  };

  getMomemsByFont(userId, themeId) {
    return this.momem.get(`/momem/theme/${themeId}/font/${userId}`)
    .then(({ data }) => data)
      
  }

  create(momem) {
    return this.momem.post('/momem', momem)
    .then(({ data }) => data)
    
  };

  detail(id) {
    return this.momem.get(`/momem/${id}`)
    .then(({ data }) => data)
    
  };

  edit(momem, id) {
    return this.momem.put(`/momem/${id}`, momem)
    .then(({ data }) => data)
    
  };

  delete(id) {
    return this.momem.delete(`/momem/${id}`)
    .then(({ data }) => data)
    
  };

}

const momem = new Momem();

export default momem;