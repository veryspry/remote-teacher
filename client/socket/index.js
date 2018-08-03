'use strict'

import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})


let isInitiator

// create or ask to join a room
window.room = prompt("Enter room name:")

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

export default socket
