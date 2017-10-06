/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskInfoSchema = new Schema({
    user: {type: String, required: true},
    done: {type: Date, required: true},
    task: {type: String, required: true}
});

var TaskInfo = mongoose.model('TaskInfo', taskInfoSchema);

module.exports = TaskInfo;