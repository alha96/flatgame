/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Flat = require('../models/Flat');
var Task = require('../models/Task');

exports.create_flat = function (req, res) {
    console.log('Creating a flat...');
    var user = new User(req.body);
    user.save(function (err, result) {
        if (err) {
            res.send(err);
            console.log('Flat not created');
        } else {
            res.json(result);
            console.log('Flat created: ', JSON.stringify(result));
        }
    });
};

exports.get_flat = function (req, res) {

};

exports.update_flat = function (req, res) {

};

exports.delete_flat = function (req, res) {

};

exports.get_all_tasks_of_flat = function (req, res) {

};

exports.create_task_in_flat = function (req, res) {

};

exports.get_all_users_of_flat = function (req, res) {

};

exports.modify_user_in_flat = function (req, res) {

};

exports.delete_user_from_flat = function (req, res) {

};

exports.get_users_of_task = function (req, res) {

};




