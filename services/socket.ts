import { io } from 'socket.io-client'
import { REACT_APP_SERVER } from './api'

const socketURL = REACT_APP_SERVER.replace('http', 'ws').replace('https', 'ws')
const socket = io(socketURL, {
  transports: ['websocket'],
  upgrade: true
});

console.log('👾👾👾',REACT_APP_SERVER)

socket.on('connect', () => {
  console.info('Connected to socket')
})

export default socket
