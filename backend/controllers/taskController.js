/**
 * Created by ahatzold on 06.10.2017.
 */
var mongoose = require('mongoose');
var Task = require('../models/Task');

exports.get_task = function (req, res) {
    console.log('Getting a task by id...');
    var taskId = req.params.taskId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No taskId given!');
        res.status(400).send({error: 'No taskId given!'});
    } else {
        Task.findOne({_id: taskId}, function (err, result) {
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(400).send(err);
                console.log('Task not found: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('Task found:', JSON.stringify(result));
                } else {
                    res.status(401).send('Unauthorized');
                    console.log('Task not found');
                }
            }
        })
    }
};

exports.delete_task = function (req, res) {
    console.log('Deleting a task...');
    var taskId = req.params.taskId;
    if (typeof params !== 'undefined' && params !== null) {
        console.log('No taskId given!');
        res.status(400).send({error: 'No taskId given!'});
    } else {
        Task.remove({_id: taskId}, function(err, result){
            if (err) {
                //TODO cast error kommt, wenn id zu kurz ist - ändern?
                res.status(401).send(err);
                console.log('Task not deleted: ' + err);
            } else {
                if (result) {
                    res.status(200).json(result);
                    console.log('Task deleted: ' + JSON.stringify(result));
                } else {
                    res.status(401).send('Unauthorized');
                    console.log('Task not deleted');
                }
            }
        })
    }
};