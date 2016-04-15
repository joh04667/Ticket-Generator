var express = require('express');
var mongoose=require('mongoose');
var Ticket = require('../models/ticket_model');
var router = express.Router();
var bodyParser = require('body-parser');


var app = express();


router.post('/new', function(req, res){
  var ticket = new Ticket({
    name: req.body.name,
    type: req.body.type,
    priority: req.body.priority,
    description: req.body.description,
    assignee: req.body.assignee,
    reporter: req.body.reporter,
    created: new Date(),
  }



  );
  ticket.save(function(err){
    if (err){
      res.sendStatus(500);
    } else {
      console.log("saved ticket", ticket._id);
      res.send(ticket._id);
    }
  });
});

router.get('/', function(req, res){
  // response.send('assignments now working');
  Ticket.find({}, function(err, tickets){
    if (err){
      res.sendStatus(500);
    } else {
      res.send(tickets);
    }
  });
});


module.exports = router;
