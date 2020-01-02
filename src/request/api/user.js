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
  usersDelete (id) {
    let url = `users/delete`
    id && (url = `users/delete/${id}`)
    return axios.request({
      url: url,
      method: 'delete'
    })
  },
  usersUpdate (data) {
    return axios.request({
      url: 'users/update',
      data,
      method: 'put'
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
