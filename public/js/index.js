var socket = io();
socket.on('connect',function(){
    console.log('Connected to server!');

   socket.emit('createMessage',{
      from : 'Jatin',
      text : 'How you doing!'
   });
    // socket.emit('createEmail',{
    //     to : 'micheal@gmail.com',
    //     text : 'hello! all well'
    //  });
});
socket.on('newMessage',(message)=>{
   console.log('New Message ',message);
});
// socket.on('disconnect',function(){
//     console.log('Disconnected from Server!');
// });
//
// socket.on('newEmail',function (email) {
//     console.log('New Email ',email);
// });