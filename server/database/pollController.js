var ObjectId = require('mongodb').ObjectId;
var _ = require('underscore');
var router = require('express').Router();
router.route('/vote/:id').post(addVote);
router.route('/option/:id').post(addOption).delete(deleteOption);
router.route('/:id').post(editPoll).delete(deletePoll);
router.route('/').get(getPolls).post(addPoll);

// receive all polls in the database
// FIXME add private option for overall listing and filter for public
function getPolls(req, res) {
    console.log(`app.locals: ${req.app.locals.test}`) // FIXME remove after testing heroku
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

// increment vote count on one option
function addVote(req, res) {
    const polls = req.app.locals.polls;
    const pollId = ObjectId(req.body.poll);
    const optionToIncrement = req.body.option;
    const optionDotNotation = `options.${optionToIncrement}`;
    console.log(`Adding vote to ${optionToIncrement} in poll ${pollId}.`);

    // set up query and update (for simplicity in a more complex search)
    const query = { _id: pollId, 'options.name': optionToIncrement }
    const update = { $inc: { 'options.$.votes': 1 } }
    polls.updateOne(query, update)
        .then(result => {
            res.json(`Added vote for ${optionToIncrement}`);
        }).catch(err => console.log(err));
}

// add an individual new option to a poll
function addOption(req, res) {
    const polls = req.app.locals.polls;
    const pollId = ObjectId(req.body.id);
    const optionName = req.body.value;
    const newOption = {
        name: optionName,
        votes: 0
    }
    console.log(`Adding option ${optionName} to poll ${pollId}`);
    polls.updateOne(
        { _id: pollId },
        { $push: { options: newOption }}
    ).then(result => {
        res.json(`Added option ${optionName} to poll ${pollId}`)
    }).catch(err => console.log(err));
}

// delete an option
function deleteOption(req, res) {
    const polls = req.app.locals.polls;
    const pollId = ObjectId(req.body.id)
    const optionNameToDelete = req.body.value;
    console.log(`Deleting option ${optionNameToDelete} from poll ${pollId}`);

    const query = { _id: pollId }
    const update = { $pull: { options: { name: optionNameToDelete } } }
    polls.updateOne(query, update)
        .then(result => {
            res.json(`Deleted option ${optionNameToDelete} from poll ${pollId}`);
        }).catch(err => console.log(err));
}

module.exports = router;
