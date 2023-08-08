const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

UserSchema.plugin(uniqueValidator);

const USERSCHEMA = mongoose.model('users', UserSchema);

module.exports = USERSCHEMA;