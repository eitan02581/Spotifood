var connectedSockets = []

function addSocketRoutes(io) {
  io.on('connection', function (socket) {
    let { userId } = socket.handshake.query
    socket.userId = userId
    connectedSockets.push(socket)
    console.log(`userId:${socket.userId}, socketId:${socket.id}`)
    socket.emit('testEmit', 'this is a test')
    socket.on('disconnect', () =>{
      console.log('user disconnected', socket.userId)
    })
  });

  function getSocketByUserId(userId) {
    return connectedSockets.find(socket => {
      return socket.userId === userId
    })
  }
}

module.exports = addSocketRoutes