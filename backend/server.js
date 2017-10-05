/**
 * Created by ahatzold on 05.10.2017.
 */

console.log("Starting server");

var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://arkas_mongoadmin:ee1Jaing2j@localhost:21425/proganizer", {auth:{authdb:"admin"}');