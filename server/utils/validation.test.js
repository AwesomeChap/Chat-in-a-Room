const expect = require('expect');

const{isStr} = require('./validation');

describe('Validaion test',()=>{
   it('should reject non-string values',()=>{
       var res = isStr(123);
       expect(res).toBe(false);
   });

   it('should reject string with only spaces',()=>{
       var res = isStr('  ');
       expect(res).toBe(false);
   });

   it('should allow string with non-space charcters',()=>{
       var res = isStr(' kju -g  d765  ]');
       expect(res).toBe(true);
   });
});
