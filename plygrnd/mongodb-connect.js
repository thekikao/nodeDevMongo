// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID();
// console.log('## obj', obj);


// connect using MongoClient
let url = 'mongodb://localhost:27017/BatmansTodo';
MongoClient.connect(url, function(err, db) {
    // debug
    if (err) {
        return console.error(`!! an error occured on connect: '${err}'`);
    }
    console.log(`** connected to mongodb server: '${url}'`);


    // add 'User' collection
    db.collection('User').insertOne({
        name: 'Batman',
        age: 44,
        location: 'Gotham City'
    }, (err, result) => {
        // debug
        if (err) {
            return console.error(`!! an error occured on insert: '${err}'`);
        }
        console.log('** insert', require('util').inspect(result.ops, true, 5, true));
    });

    // close db connection
    db.close();
});