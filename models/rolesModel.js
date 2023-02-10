const mongoose = require('mongoose')
const { Schema } = mongoose;

const rolesSchema = new Schema({
    role: String,
    permission: [{ type: String }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('roles', rolesSchema);