const User = require('../models/User');

exports.authenticate = function (req, res ,next) {
    if(!req.session.userid) {
        return res.status(401).send('Unauthorized');
    }
    User.findById(req.session.userid, function (err, result) {
        if(err){
            console.log('Couldn\'t authenticate user: ', err);
            return res.status(401).send('Unauthorized');
        }

        if(!result) {
            console.log('Couldn\'t authenticate user: User doesn\'t exist');
            return res.status(401).send('Unauthorized');
        }

        res.locals.user = result;
        next();
    })
};