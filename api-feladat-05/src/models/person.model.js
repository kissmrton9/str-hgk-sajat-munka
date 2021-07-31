const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    vaccine: String/*,
    vaccine: [
        {
            count: Int
            vaccine: mongoose.Schema.Types.ObjectId,
            ref: 'Vaccine'
        }
    ]*/
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);