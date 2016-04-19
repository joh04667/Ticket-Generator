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

// edit
router.put('/edit', function(req, res){
  var ticket = new Ticket({
    _id: req.body._id,
    name: req.body.name,
    type: req.body.type,
    priority: req.body.priority,
    description: req.body.description,
    assignee: req.body.assignee,
    reporter: req.body.reporter,
    created: req.body.created,
    updated: new Date()
  });
  console.log('saving', ticket._id);

Ticket.findOneAndUpdate({"_id": ticket._id}, ticket, {new: true}, function(err, ticket) {
  if (err) {
    console.log('got an error', err);
  }

  // at this point person is null.
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

router.delete('/delete/:id', function(request, response){
  console.log('Delete ticket', request.params.id);
  Ticket.findOneAndRemove({_id: request.params.id}, function(err){
    if (err){
      console.log('delete error', err);
    }
  });
  response.sendStatus(200);
});




// export
module.exports = router;
