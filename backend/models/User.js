/**
 * Created by ahatzold on 05.10.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    id: String,
    profile_image: String,
    flat: String,
    points: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;