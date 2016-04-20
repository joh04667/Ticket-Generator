var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countSchema = new Schema({
  count: Number
});

var Count = mongoose.model('Count Title', countSchema);

module.exports = Count;
