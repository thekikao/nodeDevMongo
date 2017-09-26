const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

let todoId = '59b701633993f44996853b4c';
let userId = '59b1a671fec4c52509b042f6';

// check todo
if (!ObjectID.isValid(todoId)) {
    console.log('!! error: id not valid !!');
} else {
    // Todo.find({
    //     _id: todoId
    // }).then((result) => {
    //     console.log('## todo find', result);
    // });
    //
    // Todo.findOne({
    //     _id: todoId
    // }).then((result) => {
    //     console.log('## todo findOne', result);
    // });

    Todo.findById(todoId).then((result) => {
        if (!result) {
            return console.log('!! todo id not found !!');
        }
        console.log('## todo findById', require('util').inspect(result, true, 5, true));
    }).catch((err) => {
        console.log('## err', err);
    });
}


// check user
if (!ObjectID.isValid(userId)) {
    console.log('!! error: user id not valid !!');
} else {
    User.findById(userId).then((result) => {
        if (!result) {
            return console.log('!! user id not found !!');
        }
        console.log('## user findById', require('util').inspect(result, true, 5, true));
    }).catch((err) => {
        console.log('## err', err);
    });
}