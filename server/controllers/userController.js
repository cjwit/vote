var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').get(getUser).post(editUser).delete(deleteUser);
router.route('/').get(getUsers).post(addUser);

function getUser(req, res) {
	console.log("get user called")
}

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
