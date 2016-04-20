//[[[[[[[[[[[[[[[[[[[[[[[[[[  CONFIG  ]]]]]]]]]]]]]]]]]]]]]]]]]]
var express = require('express');
var mongoose=require('mongoose');
var bodyParser = require("body-parser");

var app = express();


app.use(express.static('server/public'));
app.use(bodyParser.json());

//route import
var index = require("../routes/index");
var tickets = require("../routes/tickets");
//[[[[[[[[[[[[[[[[[[[[[[[[[  ROUTES  ]]]]]]]]]]]]]]]]]]]]]]]]]

app.use('/', index);
app.use('/tickets', tickets);

//[[[[[[[[[[[[[[[[[[[[[[[[  DB CONNECT ]]]]]]]]]]]]]]]]]]]]]]]]
var MongoDB = mongoose.connect("mongodb://localhost/ticketing_system/").connection;

MongoDB.on('error', function(err){
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function(){
  console.log('mongodb connection open!');
});

//[[[[[[[[[[[[[[[[[[[[[[[[[[[ PORT ]]]]]]]]]]]]]]]]]]]]]]]]]]]
var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('listening on port', port);
});
