/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    points: Number,
    lastdoneDate: Date,
    lastdoneUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    duedate: Date,
    frequency: Number,
    frequencyType: Number,
    graceDays: Number,
    flat: {type: mongoose.Schema.Types.ObjectId, ref: 'Flat'}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;