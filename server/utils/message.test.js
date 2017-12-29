/**
 * Created by HP on 30-12-2017.
 */
const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage',()=>{
   it('should generate correct message object',()=>{
       var from = 'Alien';
       var text = "Spaceship is ready let's go";
       var res = generateMessage(from , text);
       expect(res.createdAt).toBeA('number');
       expect(res).toInclude({from, text});
   });
});