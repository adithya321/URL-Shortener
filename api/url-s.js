module.exports = function(app, db) {
  var sites = db.collection('sites');

  app.get('/:url', function(req, res) {
    var url = process.env.APP_URL + req.url;
    sites.findOne({
      "short_url": url
    }, function(err, result) {
      if (err) throw err;
      if (result) {
        res.redirect(result.original_url);
      } else {
        res.send({
          "error": "This url is not in the database."
        });
      }
    });
  });

  app.get('/new/:url*', function(req, res) {
    var url = req.url.slice(5);
    var newUrlObj = {};
    if(validURLRegex.test(url)) {
      newUrlObj = {
        "original_url": url,
        "short_url": process.env.APP_URL + (Math.floor(Math.random()*90000) + 10000).toString()
      };
      res.send(newUrlObj);
      save(newUrlObj, db);
    } else {
      newUrlObj = {
        "error": "Wrong url format"
      };
      res.send(newUrlObj);
    }
  });

  function save(obj, db) {
    sites.save(obj, function(err, result) {
      if (err) throw err;
      console.log('Saved ' + result);
    });
  }
};

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