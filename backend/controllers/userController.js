/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var User = require('../models/User');

exports.get_user_by_username = function (req, res) {
    console.log('Getting a user by username...');
    var username = req.query.username;
    if (isStringNull(username)) {
        console.log('No username given!');
        res.status(400).send({error: 'Please provide a username!'});
    } else {
        User.find({username: username}, function(err, result) {
            if (err) {
                res.status(404).send({error: err});
                console.log('No user found: ' + err);
            } else {
                var userMap = {};
                result.forEach(function(user) {
                    userMap[user._id] = user;
                });
                console.log(isObjectEmpty(userMap));
                if (!isObjectEmpty(userMap)) {
                    res.status(200).json(userMap);
                    console.log('Following users found:', JSON.stringify(userMap));
                } else {
                    res.status(404).send({error: 'No user found'});
                    console.log('No user found');
                }
            }
        });
    }
};

exports.create_user = function (req, res) {
    console.log('Creating a user...');
    var user = new User(req.body);
    user.save(function (err, result) {
        if (err) {
            res.status(400).send({error: err});
            console.log('User not created');
        } else {
            res.status(200).json(result);
            console.log('User created: ', JSON.stringify(result));
        }
    });
};

exports.get_user = function (req, res) {
    console.log('Getting a user by id...');
    var userId = req.params.userId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No userId given!');
        res.status(400).send({error: 'No userId given!'});
    } else {
        User.findOne({_id: userId}, function (err, result) {
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(400).send(err);
                console.log('User not found: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('User found:', JSON.stringify(result));
                } else {
                    res.status(404).send('User not found');
                    console.log('User not found');
                }
            }
        })
    }
};

exports.update_user = function (req, res) {
    console.log('Updating a user...');
    var userId = req.params.userId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No userId given!');
        res.status(400).send({error: 'No userId given!'});
    } else {
        //TODO username und email kann hier null sein - beheben!
        User.findOneAndUpdate({_id: userId}, req.body, function(err, result){
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(400).send(err);
                console.log('User not updated: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('User updated');
                } else {
                    res.status(401).send('User not updated');
                    console.log('User not updated');
                }
            }
        })
    }
};

exports.delete_user = function (req, res) {
    console.log('Deleting a user...');
    var userId = req.params.userId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No userId given!');
        res.status(400).send({error: 'No userId given!'});
    } else {
        User.remove({_id: userId}, function(err, result){
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(401).send(err);
                console.log('User not deleted: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('User deleted: ' + JSON.stringify(result));
                } else {
                    res.status(401).send('User not deleted');
                    console.log('User not deleted');
                }
            }
        })
    }
};

function isStringNull(string) {
    return string === null ||
        string === 'null' ||
        string.length < 1 ||
        string === undefined ||
        string === 'undefined';
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}