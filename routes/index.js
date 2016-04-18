var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../server/public/views/index.html'));
});

module.exports = router;
