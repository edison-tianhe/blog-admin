import axios from '../api.request'

export default {
  login (data) {
    return axios.request({
      url: 'login',
      data,
      method: 'post'
    })
  },
  signin (data) {
    return axios.request({
      url: 'signin',
      data,
      method: 'post'
    })
  },
  getUsers () {
    return axios.request({
      url: 'users',
      method: 'get'
    })
  },
  logout () {
    return axios.request({
      url: 'logout',
      method: 'get'
    })
  }
}
