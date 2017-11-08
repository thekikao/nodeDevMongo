const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

let todoId = '59db6dcc12dd11629f06d0c1';
let userId = '59b1a671fec4c52509b042f6';

if (true) {
    // check todo
    if (!ObjectID.isValid(todoId)) {
        console.log('!! error: id not valid !!');
    } else {
        // remove object
        if (false) {
            Todo.remove({}).then((result) => {
                if (!result) {
                    return console.log('!! todo id not found !!');
                }
                console.log('## todo remove', require('util').inspect(result, true, 5, true));
            }).catch((err) => {
                console.log('## err', err);
            });
        }

        // get document and and remove
        if (false) {
            Todo.findOneAndRemove({}).then((result) => {
                if (!result) {
                    return console.log('!! todo id not found !!');
                }
                console.log('## todo findOneAndRemove', require('util').inspect(result, true, 5, true));
            }).catch((err) => {
                console.log('## err', err);
            });
        }


        // get document and remove
        if (true) {
            Todo.findByIdAndRemove(todoId).then((result) => {
                if (!result) {
                    return console.log('!! todo id not found !!');
                }
                console.log('## todo findByIdAndRemove', require('util').inspect(result, true, 5, true));
            }).catch((err) => {
                console.log('## err', err);
            });
        }
    }
}