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
      url: 'articles',
      method: 'get'
    })
  }
}
