var mongoose = require('mongoose');
var User = require('../models/User');

function isNull(string) {
    return string === null ||
        string === 'null' ||
        string.length < 1 ||
        string === undefined ||
        string === 'undefined';
}


exports.get_a_user_by_username = function (req, res) {
    console.log("Getting a user by username...");
    var username = req.query.username;
    if (isNull(username)) {
        console.log("No username given!");
        //TODO wie antwortet man richtig?
        res.send('Please provide a username!');
    } else {
        User.findOne({username: username}, function (err, result) {
            if (err) {
                console.log("User not found: " + err);
                res.send(err);
            } else {
                if (result) {
                    console.log("User found:", JSON.stringify(result))
                    res.json(result);
                } else {
                    console.log("User not found");
                    res.send(null);
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
    console.log("Getting a user by id...");
    var userId = req.params.id;
    if (typeof query !== 'undefined' && query !== null) {
        console.log("No userid given!");
        //TODO wie antwortet man richtig?
        res.send('Please provide a username!');
    } else {
        User.findOne({_id: userId}, function (err, result) {
            if (err) {
                console.log("User not found: " + err);
                res.send(err);
            } else {
                if (result) {
                    console.log("User found:", JSON.stringify(result))
                    res.json(result);
                } else {
                    console.log("User not found");
                    res.send(null);
                }
            }
        })
    }
};

exports.update_a_user = function (req, res) {

};

exports.delete_a_user = function (req, res) {

};