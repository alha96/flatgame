/**
 * Created by ahatzold on 05.10.2017.
 */
const tinylog = require('tinylog');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const csurf = require('csurf');
const port = 61111;

const app = express();

app.set('trust proxy', true);

app.use(morgan('combined'));
app.use(bodyParser.json());
//Maybe we should sign csrf cookies?
app.use(cookieParser());

console.log('Connecting to database...');

mongoose.connect(config.general.connectionString, {
    useMongoClient: true
}, function(error){
    if(error){
        console.error("An error occured while connecting to the database:", error);
    } else {
        console.log("Connection to database established!");
        //Start server once the database connection is established
        console.log('Starting server...');
        app.listen(port);
        console.log('Server started on port ' + port);
    }
});

// Use native promises
mongoose.Promise = global.Promise;

console.log('Initializing session store.');
app.use(session({
    secret: config.session.secret,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: false
}));

//Enable CSRF Protection
//app.use(csurf());
// app.use(function (req, res, next) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     next();
// });

console.log("Registering routes...");
app.use('/', require('./routes/routes'));

app.use('/static', express.static('public'));

//return 404, if route does not exist
app.use(function(req, res) {
    console.log(req.session);
    res.status(404).send({url: req.originalUrl + ' not found'})
});