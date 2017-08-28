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


    // deleteMany (all items)
    if (false) {
        db.collection('Todo').deleteMany({
            text: 'clean batmobile'
        }).then((result) => {
            console.log('## deleteMany', require('util').inspect(result, true, 5, true));
        }, (err) => {
            console.error('!! error to fetch', error);
        });
    }

    // deleteOne (first item)
    if (false) {
        db.collection('Todo').deleteOne({
            text: 'clean batmobile'
        }).then((result) => {
            console.log('## deleteOne', require('util').inspect(result, true, 5, true));
        }, (err) => {
            console.error('!! error to fetch', error);
        });
    }

    // findOneAndDelete (specified item)
    if (true) {
        db.collection('User').find({
            name: 'Batman2'
        }).toArray().then((result) => {
            db.collection('User').findOneAndDelete({
                _id: result[0]._id
            }).then((result) => {
                console.log('## findOneAndDelete', require('util').inspect(result, true, 5, true));
            }, (err) => {
                console.error('!! error to fetch', error);
            });
        }, (err) => {
            console.error('!! error to fetch', error);
        });
    }

    // close db connection
    // db.close();
});