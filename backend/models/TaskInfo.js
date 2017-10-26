/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskInfoSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    done: {type: Date, default: Date.now()},
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true}
});

var TaskInfo = mongoose.model('TaskInfo', taskInfoSchema);

module.exports = TaskInfo;