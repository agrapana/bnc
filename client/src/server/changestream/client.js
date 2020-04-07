const socket_io = require('socket.io');
var io = socket_io();
const { Client } = require('../../server/models/client');
const changeStream = Client.watch();
changeStream.on('change', (change) => {
    console.log(change, "!@#$% change client"); // You could parse out the needed info and send only that data. 
    io.emit('changeData', change);
});
io.on('connection', function () {
    console.log('connected');
});
var socket = io;
module.exports = socket;