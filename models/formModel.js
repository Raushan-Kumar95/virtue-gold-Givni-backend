const mongoose = require('mongoose')
const { Schema } = mongoose;

const signupSchema = new Schema({
    fullName: String,
    email: String,
    mobile: Number,
    password: String
});

module.exports = mongoose.model('signup', signupSchema);