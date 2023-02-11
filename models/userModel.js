const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    email: String,
    mobile: Number,
    password: String,
    date: {
        type: String,
        default: Date
    }
});

module.exports = mongoose.model('user', userSchema);