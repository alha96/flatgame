/**
 * Created by ahatzold on 06.10.2017.
 */
const mongoose = require('mongoose');
const Flat = require('../models/Flat');
const Task = require('../models/Task');
const User = require('../models/User');
const TaskInfo = require('../models/TaskInfo');

exports.create_flat = (req, res) => {
    console.log('Creating a flat...');
    let newFlat = new Flat(req.body);

    //Make sure the creator is a member
    //TODO This could add him twice if he is already a member, without admin permissions
    newFlat.members.addToSet({user: res.locals.user._id, isAdmin: true});

    const oldFlat = res.locals.user.flat;

    newFlat.save().then((flat) => {
        res.locals.user.flat = flat._id;
        newFlat = flat;
        return res.locals.user.save();
    }).then(user => {
        res.status(200).json(newFlat);
        console.log('Flat created: ', JSON.stringify(newFlat));

        //Check if the user has a old flat and remove him from there.
        if(oldFlat) {
            Flat.findById(oldFlat).exec().then(flat => {
                console.log(flat, oldFlat);
                if(!flat){
                    throw('Flat not Found');
                }
                flat.members.forEach((member, index) => {
                    if(member.user.equals(user._id)) {
                        flat.members.splice(index, 1);
                    }
                });

                //Delete the flat if it hasn't any members
                if(flat.members.length === 0){
                    return flat.remove();
                } else {
                    return flat.save();
                }
            }).catch(err => {
                console.log('Couldn\'t handle the old flat: ', err);
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
};

exports.get_flat = (req, res) => {
    console.log('Getting a flat by id...');
    const flatId = req.params.flatId;
    if (!flatId) {
        console.log('No flatId given!');
        return res.status(400).json({error: 'No flatId given!'});
    }
    Flat.findById(flatId).then(flat => {
        if (flat) {
            res.status(200).json(flat);
            console.log('Flat found:', JSON.stringify(flat));
        } else {
            res.status(404).send('Flat not found');
            console.log('Flat not found');
        }
    }).catch(err => {
        res.status(400).send(err);
        console.log('Flat not found: ' + err);
    })
};

exports.update_flat = (req, res) => {
    console.log('Updating a flat...');

    const userId = res.locals.user._id;
    const flatId = req.params.flatId;

    if (!flatId) {
        console.log('No flatId given!');
        return res.status(400).json({error: 'No flatId given!'});
    }

    Flat.findById(flatId).then(flat => {
       if(!flat){
           throw('Unauthorized');
       }

        //Check user authorization
        // if(!flat.members.some(member => {return (member.user.equals(userId) && member.isAdmin)})) {
        //     console.log('The requesting user doesn\'t have admin permissions in the flat');
        //     throw('Unauthorized');
        // }

        for(const key in req.body) {
           if(key !== '_id'){
               flat[key] = req.body[key];
           }
        }

        return flat.save()
    }).then(flat => {
        res.status(200).json(flat);
        console.log('Flat updated');
    }).catch(err => {
        if(err === 'Unauthorized'){
            res.status(401).send('Unauthroized');
            console.log('Flat not updated');
        } else {
            res.status(400).send(err);
        }
    });
};

exports.delete_flat = (req, res) => {
    console.log('Deleting a flat...');
    const flatId = req.params.flatId;
    if (!flatId) {
        console.log('No flatId given!');
        return res.status(400).json({error: 'No flatId given!'});
    }

    Flat.findById(flatId).then(flat => {
        //Check user authorization
        if(!flat || !flat.members.some(member => {return (member.user.equals(res.locals.user._id) && member.isAdmin)})) {
            console.log('The requesting user doesn\'t have admin permissions in the flat');
            throw('Unauthorized');
        }

        return flat.remove();
    }).then(flat => {
        res.status(200).json(flat);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            res.status(500).send(err);
        }
    });
};

exports.get_all_tasks_of_flat = (req, res) => {
    console.log('Load task list for a flat');

    if(!req.params.flatId) {
        console.log('No flatId given!');
        return res.status(400).json({error: 'No flatId given!'})
    }

    const flatId = req.params.flatId;
    const userId = res.locals.user._id;

    Flat.findById(flatId).populate('tasks').exec().then(flat => {
        if(!flat)
            throw('Unauthorized');

        //Check user authorization
        if(!flat.members.some(member => {return member.user.equals(userId)})) {
            console.log('The requesting user is not a part of the flat.');
            return res.status(401).send('Unauthorized');
        }

        return res.status(200).json(result.tasks);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            res.status(500).send(err);
        }
    });
};

// exports.create_task_in_flat = (req, res) => {
//     console.log('Creating a new task');
//     if(!req.params.flatId){
//         console.log('FlatId is missing');
//         return res.status(400).json({error: 'No flatId given!'});
//     }
//
//     const flatId = req.params.flatId;
//     const userId = res.locals.user._id;
//
//     Flat.findById(flatId).then(flat => {
//         if(!flat) {
//             console.log('Flat not found!');
//             throw('Unauthorized');
//         }
//
//         //Check user authorization
//         if(!flat.members.some(member => {return (member.user.equals(userId) && member.isAdmin)})) {
//             console.log('The requesting user doesn\'t have admin permissions in the flat');
//             throw('Unauthorized');
//         }
//
//         //Set the flatId
//         req.body._id = flatId;
//         const newTask = new Task(req.body);
//
//         newTask.save(() => {
//             console.log('Task created: ', JSON.stringify(result));
//             flat.tasks.addToSet(result._id);
//             return flat.save();
//         }).then(() => {
//             res.status(200).json(newTask);
//         }).catch(err => {
//             res.status(500).send(err);
//         });
//     }).catch(err => {
//         if(err === 'Unauthorized') {
//             res.status(401).send('Unauthorized');
//         } else {
//             res.status(500).send(err);
//         }
//     });
// };

exports.get_all_users_of_flat = function (req, res) {
    if(!req.params.flatId){
        console.log('FlatId is missing');
        return res.status(400).json({error: 'No flatId given!'});
    }

    Flat.findById(flatId).populate('members').exec().then(flat => {
        if(!flat){
            console.log('The flat doesnt exist');
            return res.status(401).send('Unauthorized');
        }

        if(!flat.members.some(member => {return (member.user.equals(res.locals.user._id) && member.isAdmin)})){
            console.log('The requesting user doesn\'t have admin permissions in the flat');
            return res.status(401).send('Unauthorized');
        }

        res.status(200).json(flat.members);
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.modify_user_in_flat = (req, res) => {
    if(!req.params.flatId){
        console.log('FlatId is missing');
        return res.status(400).json({error: 'No flatId given!'});
    }

    if(!req.params.userId){
        console.log('UserId is missing');
        return res.status(400).json({error: 'No userId given!'});
    }

    // Deactivated so everybody can join with inv link
    // if(req.body.isAdmin === undefined || req.body.isAdmin === null) {
    //     console.log('Admin status missing');
    //     return res.status(400).json({error: 'Admin status missing'});
    // }

    const flatId = req.params.flatId;
    const userId = req.params.userId;

    Flat.findById(flatId).then(flat => {
        if(!flat) {
            throw ('Unauthorized');
        }

        //Check user authorization
        // if(!flat.members.some(member => {return (member.user.equals(res.locals.user._id) && member.isAdmin)})){
        //     console.log('The requesting user doesn\'t have admin permissions in the flat');
        //     throw ('Unauthorized');
        // }
        const index = flat.members.findIndex(member => {return member.user.equals(userId)});

        if(index === -1){
            console.log('The user isn\'t a part of the flat');
            flat.members.addToSet({user: userId, isAdmin: req.body.isAdmin});
            //TODO change user flat
        }else{
            flat.members[index].isAdmin = req.body.isAdmin;
        }

        return flat.save();
    }).then(flat => {
        res.status(200).json(flat);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            res.status(500).send(err);
        }
    });
};

exports.delete_user_from_flat = (req, res) => {
    if(!req.params.flatId){
        console.log('FlatId is missing');
        return res.status(400).json({error: 'No flatId given!'});
    }

    if(!req.params.userId){
        console.log('UserId is missing');
        return res.status(400).json({error: 'No userId given!'});
    }

    const flatId = req.params.flatId;
    const userId = req.params.userId;

    Flat.findById(flatId).then(flat => {
        if(!flat) {
            throw ('Unauthorized');
        }

        //Check user authorization
        if(!flat.members.some(member => {return (member.user.equals(res.locals.user._id) && member.isAdmin)})){
            console.log('The requesting user doesn\'t have admin permissions in the flat');
            throw ('Unauthorized');
        }
        const index = flat.members.findIndex(member => {return member.user.equals(userId)});

        if(index === -1){
            console.log('The user isn\'t a part of the flat');
            throw ('Unauthorized');
        }

        flat.members.splice(index, 1);

        return flat.save();
    }).then(flat => {
        console.log('User ' + userId + ' deleted from flat ' + flatId);
        res.status(200).json(flat);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            res.status(500).send(err);
        }
    });
};

exports.set_task_done = (req, res) => {
    if(!req.params.flatId){
        console.log('FlatId is missing');
        return res.status(400).json({error: 'No flatId given!'});
    }

    if(!req.params.taskId){
        console.log('TaskId is missing');
        return res.status(400).json({error: 'No taskId given!'});
    }

    const flatId = req.params.flatId;
    const taskId = req.params.taskId;
    const userId = res.locals.user._id;

    Promise.all([Flat.findById(flatId), Task.findById(taskId)]).then(values => {
        let flat = values[0];
        let task = values[1];
        if(!flat){
            console.log('Flat not found');
            throw('Unauthorized');
        }
        if(!task){
            console.log('Task not found');
            throw('Unauthorized');
        }

        if(req.body.user) {
            if(!flat.members.some(member => {return (member.user.equals(res.locals.user._id) && member.isAdmin)})){
                console.log('The requesting user doesn\'t have admin permissions in the flat');
                throw ('Unauthorized');
            }
        } else {
            if(!flat.members.some(member => {return member.user.equals(res.locals.user._id)})){
                console.log('The requesting user isn\'t a part of the flat');
                throw ('Unauthorized');
            }
            req.body.user = res.locals.user._id;
        }

        //Check if the task is a part of the flat
        if(!task.flat.equals(flat._id)){
            console.log('The task isn\'t a part of the flat');
            throw('Unauthorized');
        }

        if(task.done){
            console.log('This task is already done');
            throw('Done');
        }

        const taskInfo = new TaskInfo({user: req.body.user, task: taskId});
        return Promise.all([taskInfo.save(), User.findById(userId), Promise.resolve(task)]);
    }).then(values => {
        taskInfo = values[0];
        user = values[1];
        task = values[2];

        if(!taskInfo){
            throw('Error during saving the taskInfo');
        }

        if(!user) {
            taskInfo.remove();
            throw('Couldn\'t find user');
        }

        user.points += task.points;
        task.lastdoneDate = taskInfo.done;
        console.log('Setting user to ' + user._id);
        task.lastdoneUser = user._id;
        if(task.frequency !== -1){
            let dueDate = task.duedate ? task.duedate : taskInfo.done;
            switch(task.frequencyType) {
                case 0:
                    dueDate.setDate(dueDate.getDate() + task.frequency);
                    break;
                case 1:
                    dueDate.setDate(dueDate.getDate() + (task.frequency * 7));
                    break;
                case 2:
                    dueDate.setMonth(dueDate.getMonth() + task.frequency);
                    break;
            }
            task.duedate = dueDate;
            //Mongoose is dump
            task.markModified('duedate');
        }

        return Promise.all([Promise.resolve(taskInfo), user.save(), task.save()]);
    }).then(values => {
        res.status(200).json(values[0]);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else if(err === 'Done') {
            res.status(409).send('Already done');
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    })
};

exports.get_tasks_done = (req, res) => {
    if(!req.params.flatId){
        console.log('FlatId is missing');
        return res.status(400).json({error: 'No flatId given!'});
    }

    const flatId = req.params.flatId;

    Flat.findById(flatId).then(flat => {
        if(!flat){
            console.log('Flat doesn\'t exist');
            throw('Unauthorized');
        }

        //Check user authorization
        if(!flat.members.some(member => {return member.user.equals(res.locals.user._id)})) {
            console.log('The requesting user is not a part of the flat.');
            return res.status(401).send('Unauthorized');
        }

        const query = TaskInfo.find().where('task').in(flat.tasks);
        if(req.query.taskid){
            query.where('_id').equals(req.query.taskId);
        }
        if(req.query.skip){
            query.skip(req.query.skip);
        }
        if(req.query.limit){
            query.limit(req.query.limit);
        }
        return query.exec();
    }).then(taskinfos => {
        res.status(200).json(taskinfos);
    }).catch(err => {
        if(err === 'Unauthorized') {
            res.status(401).send('Unauthorized');
        } else {
            res.status(500).send(err);
        }
    });
};




