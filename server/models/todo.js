const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    }
});


module.exports = {Todo};