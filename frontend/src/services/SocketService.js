import ioClient from 'socket.io-client'

const URl = (process.env.NODE_ENV !== 'development') ? '' : '//localhost:3007'
var socket = ioClient(URl)



connectSocket();

function connectSocket() {
    // socket = ioClient(URl);
}


function connect(userId) {
    ioClient(URl, { query: `userId=${userId}` })
    socket.on("sendRequest", txt => {
        console.log("lalalala", txt);
        alert("yeah");
    });

}
function disconnect(userId) {
    socket.emit('disconnectUser', userId)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}

function on(eventName, cb) {
    console.log('event name', eventName);
    socket.on(eventName, cb)
}





export default {
    connect,
    disconnect,
    emit,
    on
}