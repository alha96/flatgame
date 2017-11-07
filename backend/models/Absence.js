const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let absenceSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
    from: {type: Date, required: true},
    to: {type: Date, required: true}
});

const Absence = mongoose.model('Absence', absenceSchema);

module.exports = Absence;