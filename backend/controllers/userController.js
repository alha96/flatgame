var mongoose = require('mongoose');
var User = require('../models/User');


exports.get_a_user_by_username = function (req, res) {
    User.findById(req.params.username, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
        console.log("User found:", JSON.stringify())
    })
};

exports.create_a_user = function (req, res) {
    var user = new User(req.body);
    user.save(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
            console.log("User created: ", JSON.stringify(result));
        }
    });
};

exports.get_a_user = function (req, res) {

};

exports.update_a_user = function (req, res) {

};

exports.delete_a_user = function (req, res) {

};