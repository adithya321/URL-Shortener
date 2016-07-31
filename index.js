var express = require('express');
var mongodb = require('mongodb');
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
	});

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/new/:url*', function(req, res) {
	var url = req.url.slice(5);
	var newUrlObj = {};
	if(validURLRegex.test(url)) {
		urlObj = {
			"original_url": url,
			"short_url": process.env.APP_URL
		};
	} else {
		newUrlObj = {
			"error": "Wrong url format"
		};
	}
	res.send(newUrlObj);
});

app.listen(port, function () {
	console.log('Example app listening on port ' + port);
});

// Regex from https://gist.github.com/dperini/729294
var validURLRegex = new RegExp(
	"^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)" +
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      // host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      // domain name
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
      // TLD identifier
      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
      // TLD may end with dot
      "\\.?" +
      ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:[/?#]\\S*)?" +
    "$", "i"
    );