var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/shares';
