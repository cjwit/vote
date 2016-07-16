// process.env requires PORT and DBURL

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var compress = require('compression');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Test = require('./data/test.js');

// controllers
var controller = require('./controllers/controller');

// requests
var app = express();
app.use(compress())
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());
app.use("/api/things", controller);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

// listen
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("   Listening on port ", port, "...");
});

// connect to database
var dburl = process.env.DBURL;
mongoose.connect(dburl)
