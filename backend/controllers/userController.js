var mongoose = require('mongoose'),
    User = require('../models/User')

exports.create_a_user = function (req, res) {
    var user = new User(req.body);
    user.save(function (err, result) {
        console.log (err, result)
    });
};