var mongoose = require('mongoose');
var User = require('../models/User');


exports.get_a_user_by_username = function (req, res) {
    var username = req.query.username;
    if(username === null){
        console.log("Please provide a username!");
        res.send({user: fuckit});
    } else {
        User.findById(username, function (err, user) {
            if (err) {
                res.send(err);
                console.log("User not found");
            } else {
                res.json(result);
                console.log("User found:", JSON.stringify(user))
            }
        })
    }

};

exports.create_a_user = function (req, res) {
    var user = new User(req.body);
    user.save(function (err, result) {
        if (err) {
            res.send(err);
            console.log("User not created");
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