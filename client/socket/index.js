'use strict'

import io from 'socket.io-client'
import { default as whiteboard, draw} from './whiteboard.js'

// import {clientCtx} from '../components/WhiteBoard'
// console.log(clientCtx)

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

const joinOrCreateRoom = roomName => {
  let isInitiator
  // create or ask to join a room
  // window.room = prompt("Enter room name:")
  window.room = roomName

  if (room !== "") {
    console.log('Message from client: Asking to join room ' + room)
    socket.emit('create or join', room)
  }

  socket.on('created', function(room, clientId) {
    isInitiator = true
  })

  socket.on('full', function(room) {
    console.log('Message from client: Room ' + room + ' is full :^(')
  })

  socket.on('ipaddr', function(ipaddr) {
    console.log('Message from client: Server IP address is ' + ipaddr)
  })

  socket.on('joined', function(room, clientId) {
    isInitiator = false
  })

  socket.on('log', function(array) {
    console.log.apply(console, array)
  })

  // listen for whiteboard events
  socket.on('draw-from-server', (start, end, color, shouldBroadcast, ctx) => {
    console.log('after draw-from-server listen', ctx)
    draw(start, end, color, false, ctx)
  })

  // emit whiteboard events
  whiteboard.on('draw', (start, end, color, shouldBroadcast, ctx) => {
    console.log('before draw-from-client emit', shouldBroadcast, ctx)
    socket.emit('draw-from-client', start, end, color, ctx)
    // socket.emit('draw-from-client', ctx)
    console.log('after draw from client emit', ctx)
  })
}


// Function to fire when you want a user to join
export const joinRoom = roomName => {

  joinOrCreateRoom(roomName)


}


// export { default as whiteboard, draw} from './whiteboard'
export default socket
