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
      .catch(error => {
        console.log(error);
      });
  };

  create(momem) {
    return this.momem.post('/momem', momem)
    .then(({ data }) => data)
    .catch(error => {
      console.log(error);
    });
  };

  detail(id) {
    return this.momem.get(`/momem/${id}`)
    .then(({ data }) => data)
    .catch(error => {
      console.log(error);
    });
  };

  edit(momem, id) {
    return this.momem.put(`/momem/${id}`, momem)
    .then(({ data }) => data)
    .catch(error => {
      console.log(error);
    });
  };

  delete(id) {
    return this.momem.delete(`/momem/${id}`)
    .then(({ data }) => data)
    .catch(error => {
      console.log(error);
    });
  };


  



}

const momem = new Momem();

export default momem;