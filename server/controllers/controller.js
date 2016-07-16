var mongoose = require('mongoose');
var Thing = require('../data/thing');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editThing).delete(deleteThing);
router.route('/').get(getThings).post(addThing);

function getThings(req, res) {
    Thing.find(function (err, things) {
        if (err) res.send(err);
        else res.json(things);
    });
}

function addThing(req, res) {
    var thing = new Thing(_.extend({}, req.body));
    thing.save(function (err) {
        if (err) res.send(err);
        else res.json(thing);
    });
}

function editThing(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { _id: id },
        update = { $set: {
            name: info.name,
            // location: info.location,
            // description: info.description,
            // date: new Date(info.date)
        }};
    Thing.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteThing(req, res) {
    var id = req.params.id;
    Thing.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
