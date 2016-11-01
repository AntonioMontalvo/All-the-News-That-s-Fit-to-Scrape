// And we bring in our Note and Article models
var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');


router.get('/', function (req, res) {
	res.redirect('/index');
});



module.exports = router;