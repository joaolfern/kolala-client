import axios from 'axios'
// @ts-ignore
// import { REACT_APP_SERVER } from '@env'
const REACT_APP_SERVER = 'http://192.168.1.7:3333'

console.log(REACT_APP_SERVER)

const api = axios.create({
  baseURL: REACT_APP_SERVER,
  timeout: 30000
})

export default api
