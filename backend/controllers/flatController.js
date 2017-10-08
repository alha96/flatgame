/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Flat = require('../models/Flat');
var Task = require('../models/Task');

exports.create_flat = function (req, res) {
        console.log('Creating a flat...');
        var flat = new Flat(req.body);
        console.log(JSON.stringify(flat));
        flat.save(function (err, result) {
            if (err) {
                res.status(400).send({error: err});
                console.log('Flat not created');
            } else {
                res.status(200).json(result);
                console.log('Flat created: ', JSON.stringify(result));
            }
        });
};

exports.get_flat = function (req, res) {
    console.log('Getting a flat by id...');
    var flatId = req.params.flatId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No flatId given!');
        res.status(400).send({error: 'No flatId given!'});
    } else {
        Flat.findOne({_id: flatId}, function (err, result) {
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(400).send(err);
                console.log('Flat not found: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('Flat found:', JSON.stringify(result));
                } else {
                    res.status(404).send('Flat not found');
                    console.log('Flat not found');
                }
            }
        })
    }
};

exports.update_flat = function (req, res) {
    console.log('Updating a flat...');
    var flatId = req.params.flatId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No flatId given!');
        res.status(400).send({error: 'No flatId given!'});
    } else {
        //TODO name kann hier null sein - beheben!
        Flat.findOneAndUpdate({_id: flatId}, req.body, function(err, result){
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(400).send(err);
                console.log('Flat not updated: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('Flat updated');
                } else {
                    res.status(401).send('Flat not updated');
                    console.log('Flat not updated');
                }
            }
        })
    }
};

exports.delete_flat = function (req, res) {
    console.log('Deleting a flat...');
    var flatId = req.params.flatId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No flatId given!');
        res.status(400).send({error: 'No flatId given!'});
    } else {
        Flat.remove({_id: flatId}, function(err, result){
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(401).send(err);
                console.log('Flat not deleted: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('Flat deleted: ' + JSON.stringify(result));
                } else {
                    res.status(401).send('Flat not deleted');
                    console.log('Flat not deleted');
                }
            }
        })
    }
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




