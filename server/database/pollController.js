var ObjectId = require('mongodb').ObjectId;
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

// Use this one as a model for others
function getPolls(req, res) {
    console.log('CALLING getPolls from pollController')
    const polls = req.app.locals.polls;
    polls.find().toArray()
        .then(allPolls => {
            res.send(allPolls);
        }).catch(err => console.log(err));
}

function addPoll(req, res) {
    const polls = req.app.locals.polls;
    const poll = req.body;
    console.log(`Adding new poll named ${poll.name}: ${poll}`);
    polls.insertOne(poll)
        .then(result => {
            res.json(poll)
        }).catch(err => console.log(err));
}

function editPoll(req, res) {
    const polls = req.app.locals.polls;
    const newPollName = req.body.value;
    const pollId = ObjectId(req.body.id);
    console.log(`Updating poll id ${pollId} name to ${newPollName}`);
    polls.updateOne(
        { _id: pollId },
        {
            $set: { "name": newPollName },
            $currentDate: { lastModified: true }
        }
    ).then(result => {
        res.json(newPollName);
    }).catch(err => console.log(err));
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
