var connectedSockets = []

function addSocketRoutes(io) {
  io.on('connection', function (socket) {
    let { userId } = socket.handshake.query
    socket.userId = userId
    connectedSockets.push(socket)
    socket.broadcast.emit('a user logged in', 'hello friends')
  });
  io.on('user joined', group => {
    console.log('inside specific socket emit')
    // io.to(getSocketByUserId(group.admin)).emit('a user joined your group', 'a user joined your group')
  })

  function getSocketByUserId(userId) {
    return connectedSockets.find(socket => {
      return socket.userId === userId
    })
  }
}

module.exports = addSocketRoutes