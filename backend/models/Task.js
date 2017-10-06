/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    points: Number,
    lastdone: Date,
    duedate: Date,
    frequency: Number,
    frequencyType: Number,
    graceDays: Number,
    flat: {type: mongoose.Schema.Types.ObjectId, ref: 'Flat'}
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;