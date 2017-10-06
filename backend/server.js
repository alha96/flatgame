/**
 * Created by ahatzold on 05.10.2017.
 */
var tinylog = require("tinylog");

console.log("Starting server");

var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('connectionString', {
    useMongoClient: true
}, function(error){
    if(error != null){
        console.error("An error occured while connecting to the database:");
        console.error(error);
    } else {
        console.log("Connection to database established!")
    }
});


