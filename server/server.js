/**
 * Created by HP on 29-12-2017.
 */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO  = require('socket.io');

var app = express();
const port = process.env.PORT||3000;
const publicPath = path.join(__dirname, '../public');
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('New user connected!');

   socket.emit('newMessage',generateMessage('Admin','Welcome to Chat-App!'));

   socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined!'));

    socket.on('createMessage',(message , callback)=> {
        console.log('Message created ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from server.js');
    });

    socket.on('createLocationMessage',function (coords) {
        io.emit('newMessage',generateMessage('Admin',`${coords.latitude},${coords.longitude}`));
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect',(socket)=>{
        console.log('User disconnected!');
    });

    //io.emit sends the doc to everyone on connection including us
    //socket.broadcast.emt sends the doc to everyone on connection excluding us
});


server.listen(port,()=>{
    console.log(`Server is up on PORT : ${port}`);
});