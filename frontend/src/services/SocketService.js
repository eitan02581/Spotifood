import io from 'socket.io-client';

const serverUrl = process.env.NODE_ENV !== 'development' ? '' : 'http://localhost:3007';
var socket

function connect(userId) {
    socket = io(serverUrl, { query: `userId=${userId}` });
    return socket
}

export default {
    connect,
}