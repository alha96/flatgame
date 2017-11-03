/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let taskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    points: {type: Number, required: true},
    lastdoneDate: {type: Date, default: null},
    lastdoneUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    duedate: {type: Date, default: Date.now},
    frequency: {type: Number, required: true},
    frequencyType: {type: Number, required: true},
    graceDays: {type: Number, default: -1},
    flat: {type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true},
    //TODO Set default icon
    icon: {type: String, default: ''}
});

taskSchema.virtual('done').get(function () {
    if(this.frequency === -1) {
        return true;
    }
    return moment(this.duedate.getTime()).isAfter();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;