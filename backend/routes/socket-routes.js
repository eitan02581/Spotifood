var connectedSockets = [];


function addSocketRoutes(io) {

    io.on('connection', (socket) => {
        console.log('user connect');

        let { userId } = socket.handshake.query
        socket.userId = userId
        if (userId) {
            let isExist = connectedSockets.find(s => s.userId === userId)
            if (!isExist) {
                connectedSockets.push(socket)

                console.log('connectedSockets', connectedSockets.length);
            }
        }

        socket.on('disconnect', () => {
            let isExist = connectedSockets.find(s => s.userId === userId);
            if (isExist) {
                connectedSockets = connectedSockets.filter(s => s.userId !== s.userId)
                console.log(`${socket.userId} disconnected!`);
            }
        })

        socket.on('disconnectUser', userId => {
            let isExist = connectedSockets.find(s => s.userId === userId);
            if (isExist) {
                console.log(`${socket.userId} disconnected!`);
                connectedSockets = connectedSockets.filter(s => s.userId !== s.userId)
            }
        })

        socket.on('joinGroup', ({ user, group }) => {
            let targetId = group.admin._id;

            let targetSocket = findSocketByUserId(targetId);

            if (targetSocket) {
                console.log('admin user id:', targetSocket.userId)
                targetSocket.emit('sendRequest', 'hi there')
                // console.log('server: socket sent request', targetSocket.id);
                // console.log(connectedSockets.length)
                // var socketArr = Object.keys(io.sockets.connected)
                // console.log(socketArr)
                // socketArr.forEach((socketId) => {
                //     console.log('userId: ', io.sockets.connected[socketId].userId)
                //     console.log('targetsocket id: ', targetSocket.id)
                //     console.log('socketId: ', socketId)
                //     // if (socketId === targetSocket.id) {
                //     //     io.sockets.connected[socketId].emit('sendRequest')
                //     // }
                //     // console.log('are they equal?', socketId === targetSocket.id)
                // })
                // io.to(socketArr[socketArr.length - 1].id).emit('sendRequest');
                // io.sockets.connected[socketArr[3]].emit('sendRequest', { user, group });
                // io.sockets.connected[targetSocket.id].emit('sendRequest', { user, group });
            }
        })
        // TODO: CONTINUE FROM HERE , SEND REQUEST TO ADMIN's SOCKET
        // targetSocket.on('sendRequest', ({ user, group }) => {
        //     console.log('admin kibel', user);

        // console.log(user._id, group._id);

        // let targetId = request.recipient.id;
        // let targetSocket = findSocketByUserId(targetId);
        // if (targetSocket) {
        //     targetSocket.emit('sendRequest', request);
        // }
        // });


        // socket.on('userConnected',  => {

        // })






        // socket.on('disconnect', function () {

        // });
    });

    function findSocketByUserId(userId) {
        return connectedSockets.find(s => {
            return s.userId === userId
        });
    }
}

module.exports = addSocketRoutes