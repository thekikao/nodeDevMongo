const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 4
};

var token = jwt.sign(data, '123abc');
console.log('## token', token);


var decoded = jwt.verify(token, '123abc');
console.log('## decoded', decoded);