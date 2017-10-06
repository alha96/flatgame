/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//TODO: arrays correct?
var flatSchema = new Schema({
    name: {type: String, required: true},
    id: String,
    members: [{
        id: String,
        isAdmin: Boolean
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Task'
    }],
    image: String,
    description: String
});

var User = mongoose.model('Flat', flatSchema);

module.exports = Flat;