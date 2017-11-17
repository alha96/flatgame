const config = require('config');
const oAuthClient = require('simple-oauth2');
const fetch = require('node-fetch');

const mongoose = require('mongoose');
const User = require('../models/User');

exports.oAuth2_redirect = (req, res) => {
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

    const redirect = (config.general.base_path ? config.general.base_path  : req.protocol + '://' + req.host) + req.path + '/callback';

    // Authorization oauth2 URI
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: redirect,
        scope: config.oauth2[req.params.provider].scope,
        state: req.query.state ? req.query.state : null
    });

    res.redirect(authorizationUri);
};

exports.oAuth2_handle_google = (req, res) => {
    if(!req.query.code)
    {
        res.status(400).json({error: "Invalid oauth code"});
    }

    const redirect = (config.general.base_path ? config.general.base_path  : req.protocol + '://' + req.host) + req.path;

    const tokenConfig = {
        code: req.query.code,
        redirect_uri: redirect
    };

    const oauth2 = oAuthClient.create(config.oauth2.google.oauth);

    oauth2.authorizationCode.getToken(tokenConfig).then(result => {
        //Seems like this is a valid user
        //Let's get some details from google :)
        const accessToken = result.access_token;
        return fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {headers: {Authorization: 'Bearer ' + accessToken}});
    }).then(res => {
        if(res.status !== 200){
            throw('Access token seems to be invalid');
        }
        return res.json();
    }).then(data => {
        User.findOne().where('googleid').equals(data.id).exec().then(doc => {
            if (doc) {
                req.session.userid = doc._id;
                res.redirect(303, req.session.return);
            } else {
                let user = new User({
                    username: data.given_name,
                    profile_image: data.picture,
                    email: data.email,
                    points: 0,
                    googleid: data.id
                });
                user.save().then(doc => {
                    //User created
                    console.log('User created: ', doc);
                    req.session.userid = doc._id;
                    res.redirect(303, req.session.return);
                })
            }
        });
    }).catch(error => {
        console.error(error);
        res.status(500).send('Something broke!')
    });
};

exports.get_current_user = (req, res) => {
        res.status(200).json({"_id":"5a0078553bd30b14e4a6d09d","username":"Lars","googleid":114991111746410990000,"__v":0,"points":0,"flat":null,"profile_image":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg","email":null});
        //res.status(200).json(res.locals.user);
};

exports.destroy_session = (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).json({error: 'Unable to destroy the session'});
        }
    });
    res.status(200).send();
};