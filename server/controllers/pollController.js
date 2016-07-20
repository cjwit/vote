var mongoose = require('mongoose');
var Poll = require('../data/poll');
var _ = require('underscore');

var router = require('express').Router();
// router.route('/:id').post(editEvent).delete(deleteEvent);
router.route('/').get(getPolls).post(addPoll);

function getPolls(req, res) {
    Poll.find(function (err, polls) {
        if (err) res.send(err);
        else res.json(polls);
    });
}

function addPoll(req, res) {
    var poll = new Poll(_.extend({}, req.body));
	var options = poll.options[0].split(",");
	poll.options = [];
	options.map(function(optionName) {
		var option = {
			name: optionName.trim(),
			votes: 0
		};
		poll.options.push(option);
	})

	console.log(poll);

    poll.save(function (err) {
        if (err) res.send(err);
        else res.json(poll);
    });
}

/*
function editEvent(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { _id: id },
        update = { $set: {
            name: info.name,
            location: info.location,
            description: info.description,
            date: new Date(info.date),
            tags: info.tags,
            contactName: info.contactName,
            contactEmail: info.contactEmail,
            edited: info.edited,
            editDate: info.editDate
        }};
    Event.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteEvent(req, res) {
    var id = req.params.id;
    Event.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

*/

module.exports = router;
