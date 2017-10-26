/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flatSchema = new Schema({
    name: {type: String, required: true},
    members: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        isAdmin: { type: Boolean, default: false}
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true
    }],
    //TODO Set default flat image
    image: {type: String, default: ''},
    description: {type: String, default: ''}
});

const Flat = mongoose.model('Flat', flatSchema);

module.exports = Flat;