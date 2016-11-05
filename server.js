// dependencies
var express = require('express');//http for servers
var app = express();
var path = require('path');

var bodyParser = require('body-parser');//parses incoming requests
var logger = require('morgan');//an http logger to help register requests to DB
var mongoose = require('mongoose'); //an object modeling tool for Mongo DB



var request = require('request'); //makes http calls
var cheerio = require('cheerio');// scrape a website using jQuery syntax 
//handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({//set up handlebars
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//this sets up morgan
app.use(logger('dev'));
//body-parser use urlencoded
app.use(bodyParser.urlencoded({//
  extended: false
}));
// static file support with public folder
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect('mongodb://localhost/homeWorkWeek18');
// Database configuration with mongoose
mongoose.connect('mongodb://heroku_rtktdsqp:4jndghoq0n9ore2n7avareu2t3@ds139817.mlab.com:39817/heroku_rtktdsqp');// tell mongoose the connection and db name. If the db does not exist, create one.
var db = mongoose.connection; //store the connection instance

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});



//controllers
var routes = require('./controllers/article_controller.js');
app.use('/', routes);


var port = process.env.PORT || 3000;

// listen on port 3000
app.listen(port, function() {
  console.log('App running on port 3000!');
});


// our module get's exported as app.
module.exports = app;
