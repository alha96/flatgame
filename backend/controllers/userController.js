var mongoose = require('mongoose');
var User = require('../models/User');

exports.create_a_user = function (req, res) {
    var user = new User(req.body);
    user.save(function (err, result) {
        /*console.log (err, JSON.stringify(result));
        res.send(err);*/
        if (err)
            res.send(err);
        res.json(result);
    });
    console.log("User created")
};