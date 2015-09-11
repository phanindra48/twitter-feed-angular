var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var twitter = require('twitter');
var config = require('./config');

var app = express();
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

// Create a new ntwitter instance
var twit = new twitter(config.twitter);


// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//api
app.get('/api/feed', function(req, res) {
    console.log('fetching feed from server');
    var params = {
        lat: req.body.latitude,
        long: req.body.longitude,
        accuracy: '10000'
    };
    console.log(params);
    twit.get('https://api.twitter.com/1.1/geo/search.json', params, function(error, tweets, response) {
        if (error)
            res.send(error)
        res.json(tweets); // return all tweets in JSON format
    });
});


app.post('/api/feed', function(req, res) {
    console.log('fetching feed from server');
    var params = {
        lat: req.body.latitude,
        long: req.body.longitude,
        accuracy: '10000'
    };
    console.log(params);

    twit.get('search/tweets', {
        q: '',
        geocode: req.body.latitude + ',' + req.body.longitude + ',10km'
    }, function(error, tweets, response) {
        //console.log(tweets);
        if (error)
            res.send(error)
        res.json(tweets); // return all tweets in JSON format
    });

});



//search twitter feed
app.get('/api/search/', function(req,res) {
    twit.get('search/tweets', {
        q: req.param('query'),
    }, function(error, tweets, response) {
        //console.log(tweets);
        if (error)
            res.send(error)
        res.json(tweets); // return all tweets in JSON format
    });
});

// listen (start app with node server.js) ======================================
app.listen(config.port);
console.log("App listening on port " + config.port);
