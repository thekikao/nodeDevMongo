const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, {
    useMongoClient: true
});

// helper functions
const saveRecord = ((record) => {
    record.save().then((result) => {
        console.log('## result', require('util').inspect(result, true, 5, true));
    }, (err) => {
        console.error('!! unable to connect', err);
    });
});
const saveRecordPost = ((record, response) => {
    record.save().then((result) => {
        // console.log('## result', require('util').inspect(result, true, 5, true));
        response.send(result);
    }, (err) => {
        // console.error('!! unable to connect', err);
        response.status(400).send(err);
    });
});


module.exports = {mongoose, saveRecord, saveRecordPost};