///timestamp is the number of  milli seconds from 1/1/1970 at 00:00:00 also known as linux epic

// var date = new Date();
// var months = ['Jan','Feb'];
// console.log(date.getMonth());//months stored from index 0

var moment = require('moment');
var date = moment();
console.log(date.format('LT'));
console.log(date.format('h:mm a'));