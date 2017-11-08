const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 6,
        validate: {
            isAsync: true,
            validator: validator.isEmail,
            message: '{VALUE} ist not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return lodash.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, '123xyz').toString();

    user.tokens.push({access, token});

    return user.save().then(() =>  {
        return token;
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};