var moment = require('moment');

generateMessage = (from, text)=>{
  return {from , text , createdAt : moment().valueOf()} //new Date().getTime()};
};

var generateLocationMessage = (from, lat, lng)=>{
  return {
    from,
    url : `https://www.google.com/maps?${lat},${lng}`,
    createdAt : moment().valueOf()
  };
};
module.exports = {generateMessage, generateLocationMessage};