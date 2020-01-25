import axios from '../api.request'

export default {
  articlesInsert (data) {
    return axios.request({
      url: 'articles/insert',
      data,
      method: 'post'
    })
  },
  articlesDelete (id) {
    let url = `articles/delete`
    id && (url = `articles/delete/${id}`)
    return axios.request({
      url: url,
      method: 'delete'
    })
  },
  articlesUpdate (data) {
    return axios.request({
      url: 'articles/update',
      data,
      method: 'put'
    })
  },
  getArticles () {
    return axios.request({
      url: 'articles/1/1000',
      method: 'get'
    })
  },
  articlesDetails (id) {
    return axios.request({
      url: `articles/${id}`,
      method: 'get'
    })
  },
  articlesStick (id, stick) {
    return axios.request({
      url: `articles/stick/${id}/${stick}`,
      method: 'put'
    })
  },
  articlesStatus (id, status) {
    return axios.request({
      url: `articles/status/${id}/${status}`,
      method: 'put'
    })
  }
}
