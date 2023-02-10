const mongoose = require('mongoose')
const { Schema } = mongoose;

const signupSchema = new Schema({
    fullName: String,
    email: String,
    mobile: Number,
    password: String,
    otp: Number,
    isEmailVerified: { type: Boolean, default: false },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('signup', signupSchema);
