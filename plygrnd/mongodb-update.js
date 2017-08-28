// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


// connect using MongoClient
let url = 'mongodb://localhost:27017/BatmansTodo';
MongoClient.connect(url, function(err, db) {
    // debug
    if (err) {
        return console.error(`!! an error occured on connect: '${err}'`);
    }
    console.log(`** connected to mongodb server: '${url}'`);


    // findOneAndUpdate (specified item)
    if (false) {
        db.collection('Todo').findOneAndUpdate({
            text: 'clean batmobile'
        }, {
            $set: {
                done: true
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log('## findOneAndUpdate', require('util').inspect(result, true, 5, true));
        }, (err) => {
            console.error('!! error to fetch', error);
        });
    }

    if (true) {
        db.collection('User').findOneAndUpdate({
            name: 'Robin'
        }, {
            $set: {
                name: 'Robin G. Lord'
            },
            $inc: {
                age: -5
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log('## findOneAndUpdate', require('util').inspect(result, true, 5, true));
        }, (err) => {
            console.error('!! error to fetch', error);
        });
    }

    // close db connection
    // db.close();
});