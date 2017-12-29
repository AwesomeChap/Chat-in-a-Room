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
});


server.listen(port,()=>{
    console.log(`Server is up on PORT : ${port}`);
});