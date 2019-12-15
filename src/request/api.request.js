import HttpRequest from './axios'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

const axios = new HttpRequest(baseUrl)
export default axios
