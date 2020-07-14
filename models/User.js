var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    userCategory: {
        type: String,
        required: false
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);


module.exports = User;