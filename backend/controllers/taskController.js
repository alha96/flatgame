/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Task = require('../models/Task');
const Flat = require('../models/Flat');
const moment = require('moment');

exports.get_task = (req, res) => {
    console.log('Getting a task by id...');
    const taskId = req.params.taskId;
    if (!taskId) {
        console.log('No taskId given!');
        return res.status(400).send({error: 'No taskId given!'});
    }

    Task.findById(taskId).then(task => {
        if (!task) {
            console.log('Task not found');
            throw ('Unauthorized');
        }

        if(!task.flat.equals(res.locals.user.flat)){
            console.log('The user isn\'t a part of the flat');
            throw ('Unauthorized');
        }

        res.status(200).json(task);
        console.log('Task found:', JSON.stringify(task));
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            console.log(err);
            res.status(400).send(err);
        }
    })
};

exports.get_all_tasks = (req, res) => {
    if(!res.locals.user.flat){
        console.log('Requesting user isn\'t part of any flat');
        return res.status(200).json([]);
    }

    Task.find().where('flat').equals(res.locals.user.flat).exec().then(tasks => {
        if(req.query.done !== undefined && req.query.done !== null){
            if(req.query.done === 'true') {
                tasks = tasks.filter(task => {
                    return task.done;
                })
            }else{
                tasks = tasks.filter(task =>  {
                    return !task.done;
                })
            }
        }
        return res.status(200).json(tasks);
  }).catch(err => {
      console.log(err);
      res.status(500).send(err);
  })
};

exports.create_task = (req, res) => {
    console.log('Creating a new task');
    let task;
    try {
        task = new Task(req.body);
    }catch(err){
        return res.status(400).json({error: "Task object is not valid: " + err.message});
    }

    if(!task.flat.equals(res.locals.user.flat)){
        console.log('The user isn\'t a part of the flat');
        return res.status(401).send('Unauthorized');
    }

    //Check if the user has admin permissions
    Flat.findById(task.flat).then(flat => {
        if(!flat.members.some(member => {return (member.user.equals(res.locals.user._id) && member.isAdmin)})){
            console.log('User doesn\'t have admin permissions.');
            throw('Unauthorized');
        }

        flat.tasks.addToSet(task._id);
        return Promise.all([task.save(), flat.save()]);
    }).then(values => {
        task = values[0];
        flat = values[1];
        if(!task || !flat) {
            console.log('Couldn\'t save the task or flat');
            return res.status(500).send();
        }
        console.log('Task created: ', task);
        res.status(200).json(task);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    })
};

exports.delete_task = (req, res) => {
    console.log('Deleting a task...');
    const taskId = req.params.taskId;
    if (!taskId) {
        console.log('No taskId given!');
        return res.status(400).send({error: 'No taskId given!'});
    }
    Task.findByIdAndRemove(taskId).then(task => {
        if(!task){
            console.log('Task not deleted');
            throw ('Unauthorized');
        }
        console.log('Task deleted: ' + JSON.stringify(task));
       res.send(200).json(task);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    });
};