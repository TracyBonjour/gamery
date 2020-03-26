// components/auth/auth-service.js

import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
    withCredentials: true
  }),

  login(email, password) {
    return this.service.post('/sessions', {email, password})
      .then(response => response.data)
  },

  signup(username, email, password) {
    return this.service.post('/users', {
      username,
      email,
      password
    })
      .then(response => response.data)
  },

  loggedin() {
    return this.service.get('/session')
      .then(response => response.data)
  },

  logout() {
    return this.service.delete('/session', {})
      .then(response => response.data)
  },

  edit(username, email, password) {
    return this.service.put('/user', {
      username,
      email,
      password
    })
      .then(response => response.data)
  },

  profile(username, email, password, departement) {
    return this.service.get('/user', {
      username,
      email,
      password,
      departement
    })
      .then(response => response.data)
  },

  upload(formdata) {
    return this.service.post('/upload', formdata)
      .then(response => response.data)
  },

  removeuser() {
    return this.service.delete('/user', {})
    .then(response => response.data)
  },

  // addcollection(colTitle) {
  //   return this.service.post(`/${this.user.username}/collections`, {
  //     colTitle
  //   })
  //   .then(response => response.data)
  // },

};