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
                console.log('target');
                targetSocket.emit('sendRequest', { user, group });
            }
        })
// TODO: CONTINUE FROM HERE , SEND REQUEST TO ADMIN's SOCKET
        socket.on('sendRequest', ({ user, group }) => {
            console.log('admin kibel', user);

            // console.log(user._id, group._id);

            // let targetId = request.recipient.id;
            // let targetSocket = findSocketByUserId(targetId);
            // if (targetSocket) {
            //     targetSocket.emit('sendRequest', request);
            // }
        });


        // socket.on('userConnected',  => {

        // })






        // socket.on('disconnect', function () {

        // });
    });

    function findSocketByUserId(userId) {
        return connectedSockets.find(s => {

            // console.log(s.userId);

            return s.userId === userId
        });
    }
}

module.exports = addSocketRoutes