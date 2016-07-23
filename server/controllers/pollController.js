var mongoose = require('mongoose');
var Poll = require('../data/poll');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').get(getPoll).post(editPoll).delete(deletePoll);
router.route('/').get(getPolls).post(addPoll);

// getPoll necessary?
function getPoll(req, res) {
	console.log("get poll called")
}

function getPolls(req, res) {
    Poll.find(function (err, polls) {
        if (err) res.send(err);
        else res.json(polls);
    });
}

function addPoll(req, res) {
    var poll = new Poll(_.extend({}, req.body));
	console.log("addPoll:", poll);
	poll.date = new Date(Date.now());
    poll.save(function (err) {
        if (err) res.send(err);
        else res.json(poll);
    });
}

function editPoll(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { _id: id },
        update = { $set: {
            name: info.name,
			options: info.options
        }};
	console.log("editPoll:", update);
    Poll.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deletePoll(req, res) {
    var id = req.params.id;
    Poll.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
