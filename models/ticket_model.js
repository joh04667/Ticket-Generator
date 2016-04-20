var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
  title: {type: String, required: true},
  name: {type: String, required: true},
  type: {type: String, required: true},
  priority: {type: String, required: true},
  description: {type: String, required: true},
  assignee: {type: String, required: true},
  reporter: {type: String, required: true},
  created: {type: Date, required: true},
  updated: {type: Date, required: false}
});

var Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
