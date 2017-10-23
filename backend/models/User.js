/**
 * Created by ahatzold on 05.10.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String},
    profile_image: String,
    flat: {type: mongoose.Schema.Types.ObjectId, ref: 'Flat'},
    points: Number,
    googleid: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;