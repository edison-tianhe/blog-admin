import axios from '../api.request'

export default {
  categorysInsert (data) {
    return axios.request({
      url: 'categorys/insert',
      data,
      method: 'post'
    })
  },
  categorysDelete (id) {
    let url = `categorys/delete`
    id && (url = `categorys/delete/${id}`)
    return axios.request({
      url: url,
      method: 'delete'
    })
  },
  categorysUpdate (data) {
    return axios.request({
      url: 'categorys/update',
      data,
      method: 'put'
    })
  },
  getCategorys () {
    return axios.request({
      url: 'categorys',
      method: 'get'
    })
  },
  categorysList () {
    return axios.request({
      url: 'findCategorys',
      method: 'get'
    })
  }
}
