var mongoose = require('mongoose');
var Poll = require('../data/poll');
var _ = require('underscore');

var router = require('express').Router();
router.route('/vote/:id').post(addVote);
router.route('/option/:id').post(addOption).delete(deleteOption);
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
            name: info.value
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

function addVote(req, res) {
    var id = req.params.id;
	var option = req.body.option;
	var query = { _id: id,
				  'options.name': option },
        update = { $inc: {
			'options.$.votes': 1
        }};
    Poll.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function addOption(req, res) {
    var id = req.params.id;
	var option = {
		name: req.body.value,
		votes: 0
	}
	var query = { _id: id },
        update = { $push: { options: option }};
    Poll.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteOption(req, res) {
    var id = req.params.id;
	var value = req.body.value;
	var query = { _id: id },
        update = { $pull: { options: { name: value }}};
    Poll.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

module.exports = router;
