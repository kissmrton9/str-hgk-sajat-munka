const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    vaccine: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);