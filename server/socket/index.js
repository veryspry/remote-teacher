module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

      // convenience function to log server messages on the client
      function log() {
        let array = ['Message from server:']
        array.push.apply(array, arguments)
        socket.emit('log', array)
      }

      socket.on('message', function(message) {
        log('Client said: ', message)
        // for a real app, would be room-only (not broadcast)
        socket.broadcast.emit('message', message)
      })

      socket.on('create or join', function(room) {
        log('Received request to create or join room ' + room)

        let clientsInRoom = io.sockets.adapter.rooms[room]
        let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0

        // Create room if room doesn't exist
        if (numClients === 0) {
          socket.join(room)
          log('Client ID ' + socket.id + ' created room ' + room)
          socket.emit('created', room, socket.id)
        // Join room if it exists with only one user
        } else if (numClients === 1) {
          log('Client ID ' + socket.id + ' joined room ' + room)
          io.sockets.in(room).emit('join', room)
          socket.join(room)
          socket.emit('joined', room, socket.id)
          io.sockets.in(room).emit('ready')
        } else { // max two clients
          socket.emit('full', room)
        }
        let clientsInRoom2 = io.sockets.adapter.rooms[room]
        let numClients2 = clientsInRoom2 ? Object.keys(clientsInRoom2.sockets).length : 0

        console.log('clients in room', clientsInRoom2)

        console.log('number of clients', numClients2)
        log('Room ' + room + ' now has ' + numClients2 + ' client(s)')

      })

      socket.on('ipaddr', function() {
        let ifaces = os.networkInterfaces()
        for (var dev in ifaces) {
          ifaces[dev].forEach(function(details) {
            // make this IPv6 compatible default was IPv4
            if (details.family === 'IPv6' && details.address !== '127.0.0.1') {
              socket.emit('ipaddr', details.address)
            }
          })
        }
    })

    // set up whiteboard listener
    socket.on('draw-from-client', (start, end, color) => {
      socket.broadcast.emit('draw-from-server', start, end, color)
    })


    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
