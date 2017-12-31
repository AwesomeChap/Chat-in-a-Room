const path = require('path');
const http = require('http');
const express = require('express');
const socketIO  = require('socket.io');

var app = express();
const port = process.env.PORT||3000;
const publicPath = path.join(__dirname, '../public');
var server = http.createServer(app);
var io = socketIO(server);

const {Users} = require('./utils/users.js')
var users = new Users();
const {isStr} = require('./utils/validation.js');
const {generateMessage, generateLocationMessage} = require('./utils/message');
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('New user connected!');

   // socket.emit('newMessage',generateMessage('Admin','Welcome to Chat-App!'));
   // socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined!'));

   socket.on('join',(param, callback)=> {
       if (isStr(param.name) && isStr(param.room)) {
           socket.join(param.room);
           users.removeUser(socket.id);
           users.addUser(socket.id, param.name, param.room);

           io.to(param.room).emit('updateUserList',users.getUserList(param.room))
           socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat-App!'));
           socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', `${param.name} joined`));
           callback();
       }
       else{

       //socket.leave(group);
       //socket.join(group);
       //io.emit --> io.to(group).emit;
       //spcket.broadcast.emit --> socket.broadcast.to(group).emit;
       //socket.emit
       callback('Invalid Name | Room !');
   }
   });

   socket.on('createMessage',(message , callback)=> {
        //console.log('Message created ', message);
       var user = users.getUser(socket.id);

       if(user && isStr(message.text)) {
           io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
       }

       callback('this is from server.js');
    });

    socket.on('createLocationMessage',function (coords) {
        var user = users.getUser(socket.id);
        //io.emit('newMessage',generateMessage('Admin',`${coords.latitude},${coords.longitude}`));
       if(user) {
           io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
       }
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected!');
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
        }
    });

    //io.emit sends the doc to everyone on connection including us
    //socket.broadcast.emt sends the doc to everyone on connection excluding us
});


server.listen(port,()=>{
    console.log(`Server is up on PORT : ${port}`);
});