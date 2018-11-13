import axios from 'axios';

class User {

  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  getMomems(id) {
    return this.user.get(`/user/momem/${id}`)
    .then(({ data }) => data)
  }

  addFilter(themeId) {
    return this.user.put(`/user/filter/${themeId}`)
    .then(({ data }) => data)
      
  };

  addFont(themeId, fontId) {
    return this.user.put(`/user/filter/${themeId}/font/${fontId}`)
    .then(({ data }) => data)
      
  };

  getUser(userId) {
    return this.user.get(`/user/${userId}`)
    .then(({ data }) => data)
      
  };


}

const user = new User();

export default user;