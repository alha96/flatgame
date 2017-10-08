/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flatSchema = new Schema({
    name: {type: String, required: true},
    members: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        isAdmin: Boolean
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Task'
    }],
    image: String,
    description: String
});

var Flat = mongoose.model('Flat', flatSchema);

module.exports = Flat;