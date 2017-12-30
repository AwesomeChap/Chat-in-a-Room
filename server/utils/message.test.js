/**
 * Created by HP on 30-12-2017.
 */
const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
   it('should generate correct message object',()=>{
       var from = 'Alien';
       var text = "Spaceship is ready let's go";
       var res = generateMessage(from , text);
       expect(res.createdAt).toBeA('number');
       expect(res).toInclude({from, text});
   });
});

describe('generateLocationMessage',()=>{
   it('should generate correct location of message',()=>{
      var from = 'Raju';
      var lat =  '23';
      var lng = '76';
      var res = generateLocationMessage(from , lat ,lng);
      expect(res.from).toBe(from);
      expect(res.createdAt).toBeA('number');
      expect(res.url).toBe(`https://www.google.com/maps?23,76`);
   });
});