const mongoose = require('mongoose');
const Absence = require('../models/Absence');

exports.create_absence = (req, res) => {
    if(!req.params.userId){
        return res.status(400).json({error: 'Missing userId'});
    }

    const userId = req.params.userId;

    if(!res.locals.user._id.equals(userId)){
        console.log('Requesting user isn\'t allowed to create an absence for this user');
        return res.status(401).json({error: 'Unauthorized'});
    }

    req.body.user = res.locals.user._id;

    let absence;
    try {
        absence = new Absence(req.body);
    } catch (err) {
        return res.status(400).json({error: err});
    }

    absence.save().then(absence => {
        if(!absence){
            console.log('Couldn\'t save the absence');
            return res.status(500).json({error: 'Couldn\'t save the absence'});
        }
        res.status(200).json(absence);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.get_absence = (req, res) => {
    if(!req.params.userId){
        return res.status(400).json({error: 'Missing userId'});
    }

    const userId = req.params.userId;

    // if(!res.locals.users._id.equals(userId)){
    //     console.log('Requesting user isn\'t allowed to get an absence from this user');
    //     return res.status(401).json({error: 'Unauthorized'});
    //

    let query = Absence.find({user: userId});
    if(req.query.from) {


        const from = new Date(req.query.from);
        const to = req.query.to ? new Date(req.query.to) : new Date();

        query.merge({$or:[
            {$and: [{"from": {"$lte": to}},{"to": {"$gte": to}}]},
            {$and: [{"from": {"$lte": from}},{"to": {"$gte": from}}]}
        ]});
    }

    query.exec().then(absences => {
       res.status(200).json(absences);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.delete_absence = (req, res) => {
    if(!req.params.userId){
        return res.status(400).json({error: 'Missing userId'});
    }

    const userId = req.params.userId;

    if(!res.locals.users._id.equals(userId)){
        console.log('Requesting user isn\'t allowed to create an absence for this user');
        return res.status(401).json({error: 'Unauthorized'});
    }

    Absence.findByIdAndRemove(absence => {
        res.status(200).json(absence);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};