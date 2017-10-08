var mongoose = require('mongoose');
var User = require('../models/User');


exports.get_a_user_by_username = function (req, res) {
    var username = req.query.username;
    console.log("Username: " +username);
    if(username === null || username === undefined){
        console.log("Please provide a username!");
        res.send({user: fuckit});
    } else {
        User.findById(username, function (err, result) {
            console.log("result: " + result, "err: "+ err);
            if (err) {
                res.send(err);
                console.log("User not found");
            } else {
                res.json(result);
                console.log("User found:", JSON.stringify(result))
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