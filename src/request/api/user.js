import axios from '../api.request'

export default {
  login ({ username, password }) {
    const data = {
      username,
      password
    }
    return axios.request({
      url: 'login',
      data,
      method: 'post'
    })
  },
  getUserInfo () {
    return axios.request({
      url: 'users',
      method: 'get'
    })
  },
  logout (token) {
    return axios.request({
      url: 'logout',
      method: 'post'
    })
  }
}
