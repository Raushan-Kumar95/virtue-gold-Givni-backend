const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/virtue-gold', (err) => {
    if (!err) {
        console.log('DB Connected')
    }
});