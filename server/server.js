// process.env requires PORT and DBURL

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var compress = require('compression');

var app = express();
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(compress())
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());

// controllers
var userController = require('./controllers/userController');
// var authController = require('./controllers/authController');
app.use("/api/user", userController);
// app.use("/api/auth", authController);

// passport setup
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;
var User = require('./data/user.js'); // for Passport

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log("Local Strategy invoked");
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				console.log('invalid user')
				return done(null, false, { message: "Incorrect username." });
			}
			console.log('user from strategy', user);
			if (user.password != password) {
				console.log('invalid password')
				return done(null, false, { message: "Incorrect password."});
			}
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// passport requests
app.post('/api/auth/login',
	passport.authenticate('local'),
	function(req, res) {
		console.log('login called', req.body);
		console.log('from authenticate', req.user);
		res.redirect('/user/' + req.user.username);
	});

app.get('/api/auth', function(req, res) {
	console.log('checking login status');
})

// requests
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
