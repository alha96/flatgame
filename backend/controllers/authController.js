const config = require('config');
const oAuthClient = require('simple-oauth2');

exports.oAuth2_getToken = function (req, res) {
    if(!req.body.provider)
    {
        res.status(400).json({error: "Missing oauth provider"});
    }
    if(!config.oauth2[req.body.provider])
    {
        res.status(400).json({error: "Invalid oauth provider"});
    }
    if(!req.body.grant)
    {
        res.status(400).json({error: "Missing authorization grant"});
    }
    if(!req.body.redirect)
    {
        res.status(400).json({error: "Missing redirect uri"});
    }
    //Let's see how this performs :D
    console.log(config.oauth2[req.body.provider]);

    const oauth2 = oAuthClient.create(config.oauth2[req.body.provider]);

    const tokenConfig = {
        code: req.body.grant,
        redirect_uri: req.body.redirect
    };

    oauth2.authorizationCode.getToken(tokenConfig)
        .then(function (result){
        const token = oauth2.accessToken.create(result);
        console.log("It works: ", token);
        //Generate access and refresh token and respnd with it
        res.send("Success");
    }).catch(function (error) {
        console.log('Access Token Error', error);
        res.status(400).send(error.context);
    });

};
