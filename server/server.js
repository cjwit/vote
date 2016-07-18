// process.env requires PORT and DBURL

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var compress = require('compression');

var app = express();
app.use(compress())
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());

// Passport setup
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./data/user.js'); // for Passport
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: "Incorrect username." });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: "Incorrect password."});
			}
			console.log(user);
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

/*
app.post('/api/auth',
	passport.authenticate('local', { successRedirect: '/',
									 failureRedirect: '/login' })
);
*/

// controllers
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');
app.use("/api/user", userController);
app.use("/api/auth", authController);

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
