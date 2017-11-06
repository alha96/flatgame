/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const User = require('../models/User');

exports.get_user_by_username = (req, res) => {
    console.log('Getting a user by username...');
    const username = req.query.username;
    if (isStringNull(username)) {
        console.log('No username given!');
         return res.status(400).json({error: 'Please provide a username!'});
    }
    User.find({username: username}).then(users => {
        // var userMap = {};
        // result.forEach(function(user) {
        //     userMap[user._id] = user;
        // });
        // console.log(isObjectEmpty(userMap));
        // if (!isObjectEmpty(userMap)) {
        //     res.status(200).json(userMap);
        //     console.log('Following users found:', JSON.stringify(userMap));
        // } else {
        //     res.status(404).send({error: 'No user found'});
        //     console.log('No user found');
        // }
        console.log('Following users found:', JSON.stringify(users));
        res.status(200).json(users);
    }).catch(err => {
        res.status(404).json({error: err});
        console.log('No user found: ' + err);
    });
};

//Not needed
// exports.create_user = (req, res) => {
//     console.log('Creating a user...');
//     let user;
//     try {
//         user = new User(req.body);
//     } catch (err) {
//         return res.status(400).json({error: err});
//     }
//
//     user.save().then(user => {
//         res.status(200).json(user);
//         console.log('User created: ', JSON.stringify(user));
//     }).catch(err => {
//         res.status(500).send({error: err});
//         console.log('User not created', err);
//     });
// };

exports.get_user = (req, res) => {
    //TODO Who is allowed to get a user?
    console.log('Getting a user by id...');
    const userId = req.params.userId;
    if (!userId) {
        console.log('No userId given!');
        return res.status(400).send({error: 'No userId given!'});
    }
    User.findById(userId).then(user => {
        if (user) {
            res.status(200).json(user);
            console.log('User found:', JSON.stringify(user));
        } else {
            res.status(404).send('User not found');
            console.log('User not found');
        }
    }).catch(err => {
        res.status(400).send(err);
        console.log('User not found: ' + err);
    });
};

exports.update_user = (req, res) => {
    console.log('Updating a user...');
    const userId = req.params.userId;
    if (!userId) {
        console.log('No userId given!');
        return res.status(400).send({error: 'No userId given!'});
    }

    if(!res.locals.user._id.equals(userId)) {
        console.log('Requesting user isn\'t allowed to update this user');
        return res.status(401).json({error: 'Unauthorized'});
    }

    //TODO Which fields shouldn't be updated
    let updateUser = req.body;
    delete updateUser.points;
    delete updateUser.googleid;
    delete updateUser.email;
    User.findByIdAndUpdate(userId, updateUser).then(user => {
        if (user) {
            res.status(200).json(user);
            console.log('User updated');
        } else {
            res.status(401).send('User not updated');
            console.log('User not updated');
        }
    }).catch(err => {
        res.status(400).send(err);
        console.log('User not updated: ' + err);
    });
};

exports.delete_user = (req, res) => {
    console.log('Deleting a user...');
    const userId = req.params.userId;
    if (!userId) {
        console.log('No userId given!');
        return res.status(400).send({error: 'No userId given!'});
    }

    if(!res.locals.user._id.equals(userId)) {
        console.log('Requesting user isn\'t allowed to delete this user');
        return res.status(401).json({error: 'Unauthorized'});
    }

    User.findByIdAndRemove(userId).then(user => {
        if (user) {
            res.status(200).json(user);
            console.log('User deleted: ' + JSON.stringify(user));
        } else {
            res.status(401).send('Unauthorized');
            console.log('User not deleted');
        }
        //TODO Delete flat and so on
    }).catch(err => {
        //TODO cast error kommt, wenn id zu kurz ist - ändern?
        res.status(401).send(err);
        console.log('User not deleted: ' + err);
    });
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