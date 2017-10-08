var mongoose = require('mongoose');
var User = require('../models/User');

function isNull(string) {
    if (string === null ||
        string === "null" ||
        string.length < 1 ||
        string === undefined ||
        string === "undefined") {
        return true;
    } else {
        return false;
    }
}


exports.get_a_user_by_username = function (req, res) {
    var username = req.query.username;
    if (isNull(username)) {
        console.log("No username given!");
        res.send('Please provide a username!');
    } else {
        User.findOne({username: username}, function (err, result) {
            if (err) {
                res.send(err);
                console.log("User not found: " + err);
            } else {
                if (result) {
                    res.json(result);
                    console.log("User found:", JSON.stringify(result))
                } else {
                    res.send(null);
                    console.log("User not found");
                }
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