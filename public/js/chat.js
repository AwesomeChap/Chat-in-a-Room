var socket = io();

function scrollToBottom(){
    // //selectors
    // var messages = jQuery('#messages');
    // var newMessage = messages.children('li:last-child');
    // //heights
    // var clientHeight = messages.prop('clientHeight');
    // var scrollTop = messages.scrollTop();
    // var scrollTop = messages.scrollTop();
    // var scrollHeight = messages.prop('scrollHeight');
    // var newMessageHeight = newMessage.innerHeight();
    // var lastMessageHeight = newMessage.prev().innerHeight();
    //
    // //-----------------------
    // console.log('\nclientHeight : ',clientHeight);
    // console.log('scrollTop : ',scrollTop);
    // console.log('newMessageHeight : ',newMessageHeight);
    // console.log('lastMessageHeight : ',lastMessageHeight);
    // console.log('scrollHeight : ',scrollHeight);
    // //-----------------------
    //
    // if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
    // {
    //     console.log('\nShould scroll');
    //     messages.scrollTop(scrollHeight);
    // }
}

socket.on('connect',function(){
    console.log('Connected to server!');
    var param = jQuery.deparam(window.location.search);
    console.log(param);
    socket.emit('join',param,function (err) {
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else{
            console.log('Success!');
        }
    });
});
socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt : formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
   // console.log('New Message ',message);
   // var li = jQuery(`<li></li>`);
   // li.text(`[${formattedTime}] ${message.from} : ${message.text}`);
   //
   // jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from : message.from,
        createdAt : formattedTime,
        url : message.url
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery(`<li></li>`);
    // var a = jQuery('<a target="_blank">My Current Location</a>')
    //
    // li.text(`[${formattedTime}] ${message.from} : `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li)
});

socket.on('disconnect',function(){
    console.log('Disconnected from Server!');
});

socket.on('updateUserList',function (users) {
    var ul = jQuery('<ul></ul>');

    users.forEach((user)=>{
       ul.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ul);
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
       //from : 'User',
       text : messageTextbox.val()
    },function(){
        messageTextbox.val('');
    });

});

var locationButton = jQuery('#send-location');

locationButton.on('click',function () {
   if(!navigator.geolocation){
       return alert('Geolocation not support by your browser');
   }
   locationButton.attr('disabled','disabled').text('...');
   navigator.geolocation.getCurrentPosition(function (position) {
       locationButton.removeAttr('disabled').html('<i class="fas fa-map-marker-alt">');
       socket.emit('createLocationMessage',{
           latitude : position.coords.latitude,
           longitude : position.coords.longitude
       },function () {
           console.log('Position object emitted');
       });
   },function (err) {
       locationButton.removeAttr('disabled').text('<i class="fas fa-map-marker-alt">');
       return alert('Unable to fetch your location');
   });
});