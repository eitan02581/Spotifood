function addSocketRoutes(io) {
  io.on('connection', function (socket) {
    let { userId } = socket.handshake.query
    socket.userId = userId
  });
}

module.exports = addSocketRoutes