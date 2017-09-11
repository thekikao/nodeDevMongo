const express = require('express');
const bodyParser = require('body-parser');

const {mongoose, saveRecord, saveRecordPost} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

const app = express();

/** define middleware **/
app.use(bodyParser.json());

/** setup routes **/
// save a todo
app.post('/todos', (req, res) => {
    if (false) {
        let todo = new Todo({
            text: req.body.text
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });
    }

    if (true) {
        saveRecordPost(new Todo({
            text: req.body.text
        }), res);
    }
});

// get all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

// start server
let port = 3000;
app.listen(port, () => {
    console.info(`** server is up on port ${port} **`);
});


// save new records
if (false) {
    saveRecord(new Todo({
        text: 'Be like Batman',
        done: false,
        completedAt: new Date()
    }));
    saveRecord(new Todo({
        text: 'Kill the Coon',
    }));
    saveRecord(new User({
        email: 'mysterion@isahe.ro',
    }));

    // close connection
    // mongoose.connection.close();
}

module.exports = {app};