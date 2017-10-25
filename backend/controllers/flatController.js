/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Flat = require('../models/Flat');
const Task = require('../models/Task');

exports.create_flat = function (req, res) {
        console.log('Creating a flat...');
        let flat = new Flat(req.body);

        //Make sure the creator is a member
        //TODO This could add him twice if he is already a member, without admin permissions
        flat.members.addToSet({user: res.locals.user._id, isAdmin: true});


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
    const flatId = req.params.flatId;
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
    const flatId = req.params.flatId;
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
                    //TODO response ist immer die ungeänderte Instanz
                    res.status(200).json(result);
                    console.log('Flat updated');
                } else {
                    res.status(401).send('Unauthroized');
                    console.log('Flat not updated');
                }
            }
        })
    }
};

exports.delete_flat = function (req, res) {
    console.log('Deleting a flat...');
    const flatId = req.params.flatId;
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
                    res.status(401).send('Unauthorized');
                    console.log('Flat not deleted');
                }
            }
        })
    }
};

exports.get_all_tasks_of_flat = function (req, res) {
    console.log('Load task list for a flat');

    if(!req.params.flatId) {
        console.log('No flatId given!');
        return res.status(400).json({error: 'No flatId given!'})
    }

    const flatId = req.params.flatId;
    const userId = res.locals.user._id;

    Flat.findById(flatId).populate('tasks').exec(function (err, result) {
        if (err) {
            console.log('Flat not found: ' + err);
            return res.status(401).send();
        }
        if(!result) {
            console.log('Flat not found!');
            return res.status(401).send();
        }
        //Check user authorization
        if(!result.members.some(function (element) {return element.user.equals(userId)})) {
            console.log('The requesting user is not a part of the flat.');
            return res.status(401).send('Unauthorized');
        }

        return res.status(200).json(result.tasks);
    });
};

//TODO Cleanup this callback stuff
exports.create_task_in_flat = function (req, res) {
    console.log('Creating a new task');
    if(!req.params.flatId){
        console.log('FlatId is missing');
        return res.status(400).json({error: 'No flatId given!'});
    }

    const flatId = req.params.flatId;
    const userId = res.locals.user._id;

    Flat.findById(flatId, function (flatErr, flat) {
        if (flatErr) {
            console.log('Flat not found: ' + err);
            return res.status(401).send();
        }

        if(!flat) {
            console.log('Flat not found!');
            return res.status(401).send();
        }

        //Check user authorization
        if(!flat.members.some(function (element) {return (element.user.equals(userId) && element.isAdmin)})) {
            console.log('The requesting user doesn\'t have admin permissions in the flat');
            return res.status(401).send('Unauthorized');
        }

        const task = new Task(req.body);
        task.flat = flatId;
        console.log(JSON.stringify(task));

        task.save(function (err, result) {
            if (err) {
                //TODO Don't send complete error message
                console.log('Task not created:', err);

                return res.status(400).send({error: err});
            }

            console.log('Task created: ', JSON.stringify(result));
            //We have to add the task to the flat
            flat.tasks.addToSet(result._id);
            flat.save(function (error) {
                if (error) {
                    //TODO Don't send complete error message
                    console.log('Task not created:', err);

                    return res.status(400).send({error: err});
                }
                res.status(200).json(result);
            });

        })
    });
};

exports.get_all_users_of_flat = function (req, res) {

};

exports.modify_user_in_flat = function (req, res) {

};

exports.delete_user_from_flat = function (req, res) {

};

exports.get_users_of_task = function (req, res) {

};




