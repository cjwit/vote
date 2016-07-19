var express = require('express');
var app = express();
var mongoose = require('mongoose');
var _ = require('underscore');
var bodyParser = require('body-parser');
app.use(bodyParser());

// Passport setup
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;
var User = require('../data/user.js'); // for Passport

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log("Local Strategy invoked");
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				console.log('invalid user')
				return done(null, false, { message: "Incorrect username." });
			}
			if (!user.validPassword(password)) {
				console.log('invalid password')
				return done(null, false, { message: "Incorrect password."});
			}
			console.log('user from strategy', user);
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

// ####################################
// Routing and controller functionality

function loginCallback(err, user, info) {
	console.log('err', err, 'user', user, 'info', info);
}

/*
app.post('/login',
	passport.authenticate('local'),
	function(req, res) {
		console.log('login called', req.body)
		console.log('from authenticate', req.user);
		res.redirect('/user/' + req.user.username);
	}
);
*/

var router = require('express').Router();
router.route('/').get(loggedIn);
router.route('/login').post(login);
router.route('/logout').get(logout);

function loggedIn(req, res) {
	console.log("loggedIn called")
}

function login(req, res) {
	passport.authenticate('local');
	console.log('login called', req.body)
	console.log('from authenticate', req.user);
}

function logout() {
	console.log("logout called")
}

// delete all this
function getUsers(req, res) {
    User.find(function (err, users) {
        if (err) res.send(err);
        else res.json(users);
    });
}

function addUser(req, res) {
    var user = new User(_.extend({}, req.body));
	console.log(user);
    user.save(function (err) {
        if (err) res.send(err);
        else res.json(user);
    });
}

function editUser(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { _id: id },
        update = { $set: {
            username: info.username,
            // location: info.location,
            // description: info.description,
            // date: new Date(info.date)
        }};
    User.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteUser(req, res) {
    var id = req.params.id;
    User.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
