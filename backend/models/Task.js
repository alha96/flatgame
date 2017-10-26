/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    points: {type: Number, required: true},
    lastdoneDate: {type: Number, default: null},
    lastdoneUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    duedate: Date,
    frequency: {type: Number, required: true},
    frequencyType: {type: Number, required: true},
    graceDays: {type: Number, required: true},
    flat: {type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;