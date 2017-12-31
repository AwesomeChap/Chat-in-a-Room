const {Users} = require('./users');
const expect = require('expect');

describe('Users',()=>{
    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id : '1',
                name : 'jatin',
                room : 'Node Course'
            },
            {
                id : '2',
                name : 'kamal',
                room : 'React Course'
            },
            {
                id : '3',
                name : 'yuya takahashi',
                room : 'Animation'
            }
        ];
    });

    it('sdhould add a new user',()=>{
        users = new Users();
        var user = {
          id : '123',
        name : 'jatin',
        room : 'the office fans'
        };
        var res = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
        //expect(res).toEqual(user);
   });

    it('should remove the user',()=>{
       var uid = '1';
       var res = users.removeUser(uid);
       expect(res.id).toBe(uid);
       expect(users.users.length).toBe(2);
    });

    it('should not remove any user',()=>{
        var uid = '30';
        var res = users.removeUser(uid);
        expect(res).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find the user',()=>{
       var user = users.getUser('1');
       expect(user.id).toBe('1');
    });

    it('should not find the user',()=>{
        var user = users.getUser('25');
        expect(user).toNotExist();
    })
    it('should return names of node course',()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['jatin']);
    });


});