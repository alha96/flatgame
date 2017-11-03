/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskInfoSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    done: {type: Date, default: Date.now},
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true}
});

const TaskInfo = mongoose.model('TaskInfo', taskInfoSchema);

module.exports = TaskInfo;