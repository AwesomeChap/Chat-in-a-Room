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

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('New user connected!');

    socket.on('disconnect',(socket)=>{
        console.log('User disconnected!');
    });

    socket.emit('newMessage',{
        from : 'Akash',
        text : 'whats up!',
        createdAt : 123456789
    })

    socket.on('createMessage',(message)=>{
       console.log('Message created ',message);
    });
    // socket.emit('newEmail',{
    //     from : 'andrew@udemy.com',
    //     text : 'Hi there! Andrew here',
    //     createdAt : 123456789
    // });
    //
    // socket.on('createEmail',(email)=>{
    //     console.log('Email created ',email)
    // });
});


server.listen(port,()=>{
    console.log(`Server is up on PORT : ${port}`);
});