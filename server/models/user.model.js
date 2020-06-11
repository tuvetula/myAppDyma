const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    firstName: String,
    email: String,
    password: String
});

const User = mongoose.model('users' , userSchema);

module.exports = User;