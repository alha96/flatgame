/**
 * Created by ahatzold on 05.10.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, default: null},
    //TODO Set default image
    profile_image: {type: String, default: ''},
    flat: {type: mongoose.Schema.Types.ObjectId, ref: 'Flat', default: null},
    points: {type: Number, default: 0},
    googleid: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;