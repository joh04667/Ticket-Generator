var express = require('express');
var mongoose=require('mongoose');
var Count = require('../models/count');
var router = express.Router();
var bodyParser = require('body-parser');


var app = express();
