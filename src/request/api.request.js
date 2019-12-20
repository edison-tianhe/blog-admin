import HttpRequest from './axios'
import { DEV_BASEURL, PROD_BASEURL } from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? DEV_BASEURL : PROD_BASEURL

const axios = new HttpRequest(baseUrl)
export default axios
