const {SHA256} = require('crypto-js');

var msg = 'batman sucks';
var hash = SHA256(msg).toString();

console.log('## hash', hash);

var data = {
    id: 4
};
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

// manipulate the data
token.data.id = 5;
token.hash = SHA256(JSON.stringify(data).toString())

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


if (resultHash == token.hash) {
    console.log('## data was not changes');
} else {
    console.log('!! data was changed');
}