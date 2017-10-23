const config = require('config');
const oAuthClient = require('simple-oauth2');
const fetch = require('node-fetch');

const mongoose = require('mongoose');
const User = require('../models/User');

exports.oAuth2_redirect = function (req, res) {
    if(!req.params.provider) {
        res.status(400).json({error: "Missing oauth provider"});
    }
    if(!config.oauth2[req.params.provider])
    {
        res.status(400).json({error: "Invalid oauth provider"});
    }
    if(!req.query.return)
    {
        res.status(400).json({error: "Missing return uri"});
    }

    const oauth2 = oAuthClient.create(config.oauth2[req.params.provider].oauth);

    //TODO Move to state parameter?
    req.session.return = req.query.return;

    // Authorization oauth2 URI
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: req.protocol + '://' + req.get('host') + req.path + '/callback',
        scope: config.oauth2[req.params.provider].scope,
        state: req.query.state ? req.query.state : null
    });

    //Maybe we should add this to the state variable instead?
    res.cookie('returnURI', req.query.return, { maxAge: 900000, httpOnly: true });
    res.redirect(authorizationUri);
};

exports.oAuth2_handle_google = function (req, res) {
    if(!req.query.code)
    {
        res.status(400).json({error: "Invalid oauth code"});
    }

    const tokenConfig = {
        code: req.query.code,
        redirect_uri: req.protocol + '://' + req.get('host') + req.path
    };

    const oauth2 = oAuthClient.create(config.oauth2.google.oauth);

    oauth2.authorizationCode.getToken(tokenConfig).then(function (result) {
        //Seems like this is a valid user
        //Let's get some details from google :)
        const accessToken = result.access_token;
        return fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {headers: {Authorization: 'Bearer ' + accessToken}});
    }).then(function (res) {
        if(res.status !== 200){
            throw('Access token seems to be invalid');
        }
        return res.json();
    }).then(function (data) {
        User.findOne().where('googleid').equals(data.id).exec().then(function (doc) {
            if (doc) {
                req.session.userid = doc._id;
                res.redirect(303, req.session.return);
            } else {
                //TODO Maybe we should also import the email?
                let user = new User({
                    username: data.given_name,
                    profile_image: data.picture,
                    points: 0,
                    googleid: data.id
                });
                user.save().then(function (doc) {
                    //User created
                    console.log('User created: ', doc);
                    req.session.userid = doc._id;
                    res.redirect(303, req.session.return);
                })
            }
        });
    }).catch(function (error) {
        console.error(error);
        res.status(500).send('Something broke!')
    });
};
