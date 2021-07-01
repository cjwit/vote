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

// receive all polls in the database
// FIXME add private option for overall listing and filter for public
function getPolls(req, res) {
    console.log('CALLING getPolls from pollController')
    const polls = req.app.locals.polls;
    polls.find().toArray()
        .then(allPolls => {
            res.send(allPolls);
        }).catch(err => console.log(err));
}

// add a new poll to the database
function addPoll(req, res) {
    const polls = req.app.locals.polls;
    const poll = req.body;
    console.log(`Adding new poll named ${poll.name}: ${poll}`);
    polls.insertOne(poll)
        .then(result => {
            res.json(poll)
        }).catch(err => console.log(err));
}

// changes a poll's name and updates lastModified
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

// pretty obvious: delete a poll from the database
function deletePoll(req, res) {
    const polls = req.app.locals.polls;
    const idToDelete = ObjectId(req.body.id);
    console.log(`Deleting ${idToDelete}`)
    polls.deleteOne(
        { _id: idToDelete }
    ).then(result => {
            res.json(idToDelete)
    }).catch(err => console.log(err));
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
