const socket_io = require('socket.io');
var io = socket_io();
const { Warroom } = require('../../server/templatemodels/warroom');
const changeStream = Warroom.watch();
changeStream.on('change', (change) => {
    console.log(change, "!@#$% change server Warroom"); // You could parse out the needed info and send only that data. 
    io.emit('changeData', change);
});
io.on('connection', function () {
    console.log('connected');
});
var socket = io;
module.exports = socket;