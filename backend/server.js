/**
 * Created by ahatzold on 05.10.2017.
 */
var tinylog = require('tinylog');
var config = require('config');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = 61111;

app.use('/', function (req, res) {
    res.send('HELLO WORLD2');
});
console.log('Starting server...');
app.listen(port);
console.log('Server started on port ' + port);

console.log('Connecting to database...');

var connectionString = config.get('connection.connectionString');
mongoose.connect(connectionString, {
    useMongoClient: true
}, function(error){
    if(error != null){
        console.error("An error occured while connecting to the database:");
        console.error(error);
    } else {
        console.log("Connection to database established!")
    }
});

