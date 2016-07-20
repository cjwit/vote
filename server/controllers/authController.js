// process.env requires PORT and DBURL
var express = require('express');
var path = require('path');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// passport config
var User = require('../data/user.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport requests
app.post('/api/register', function(req, res) {
	console.log('register called', req.body);
	User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
		if (err) {
			return res.send('error with registration');
		}
		passport.authenticate('local')(req, res, function() {
			console.log('  -- user from authenticate', req.user, '\n');
			res.redirect('/');
		});
	});
});

app.get('/', function(req, res) {
	console.log('checking login status')
	if (req.user) {
		console.log('  -- user:', req.user.username, '\n');
		res.json(req.user.username);
	}
	else {
		console.log('  -- not logged in\n');
		res.send(false);
	}
})

app.post('/login',
	passport.authenticate('local', { failureRedirect: '/login/error' }),
	function(req, res) {
		if (req.user) {
			console.log('login called');
			console.log('  -- user from authenticate:', req.user.username, '\n');
			res.redirect('/user/' + req.user.username);
		} else {
			console.log('login failed');
			res.redirect('/login/error');
		}
	});

app.get('/logout', function(req, res) {
	console.log('logged out\n');
	req.logout();
	res.redirect('/');
});
