var express = require('express');
var mongodb = require('mongodb');
var api = require('./api/url-s.js');
var app = express();
var MongoClient = mongodb.MongoClient;
var port = process.env.PORT || 8080;
var url = 'mongodb://localhost:27017/urls';

MongoClient.connect(process.env.MONGOLAB_URI || url, 
	function(err, db) {
		if (err) {
			throw new Error('Database failed to connect!');
		} else {
			console.log('Successfully connected to MongoDB on port 27017.');
		}

		api(app, db);

		app.get('/', function (req, res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});

		app.get('/new', function (req, res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});

		app.listen(port, function () {
			console.log('Example app listening on port ' + port);
		});
	});