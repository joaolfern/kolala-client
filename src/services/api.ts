import axios from 'axios'

import { REACT_APP_SERVER } from '../../env'

console.log(' 🥨connected to🥨 ', REACT_APP_SERVER)

const api = axios.create({
  baseURL: REACT_APP_SERVER,
  timeout: 30000,
})

export default api
