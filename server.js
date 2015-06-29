/**
 * @file server.js
 * @author Charlie Fontana <cfontana0@gmail.com>
 * @version 0.1
 */
var express    = require('express'),
	app        = express(),
	bodyParser = require('body-parser'),
	mongoose   = require('mongoose'),
	walk       = require('walk'),
	router     = express.Router(),
	port       = process.env.PORT || 8080;

// define parser and logger configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to the MongoDB database.
mongoose.connect('mongodb://localhost/rest-node-api-2', function(err, res) {
	if(err) console.log('ERROR: connecting to Database. ' + err);
});

// configure routes based on the models folder
walk.walk('./app/models').on('file', function(root, stat, next) {
	require('./routes/genericRoute')(router, stat.name.split('.').shift());
	next();
});

// middleware to use for all requests
router.use(function(req, res, next) {
	//console.log('Something is happening.');
	next();
});

app.use('/api', router);

// start the server
app.listen(port);

console.log('Server started on port ' + port);