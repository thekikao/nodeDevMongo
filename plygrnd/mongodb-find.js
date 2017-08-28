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


    // list todo's
    // db.collection('Todo').find({
    //     // name: 'Batman'
    //     _id: new ObjectID('59a42c3c22ab93143c9759aa')
    // }).toArray().then((result) => {
    //     console.log('## Todo', require('util').inspect(result, true, 5, true));
    // }, (err) => {
    //     console.error('## error to fetch', error);
    // });

    // list users
    db.collection('User').find({
        name: 'Batman'
    }).toArray().then((result) => {
        console.log('## batmans', require('util').inspect(result, true, 5, true));
    }, (err) => {
        console.error('## error to fetch', error);
    });

    // close db connection
    // db.close();
});