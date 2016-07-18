var express = require('express');
var app = express();
var mongoose = require('mongoose');
var _ = require('underscore');

// Passport setup
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../data/user.js'); // for Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
	function(username, password, done) {
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

// ####################################
// Routing and controller functionality

var router = require('express').Router();
router.route('/').get(loggedIn).post(login);
router.route('/logout').get(logout);

function loggedIn(req, res) {
	console.log("loggedIn called")
}

function login(req, res) {
	console.log("login called")

	// add validation

	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			return res.status(400).send(info);
		}

		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}

			console.log(user);
			res.status(200).json(user);
		});
	})(req, res, next);
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
