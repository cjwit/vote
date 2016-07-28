var dispatcher = require('../dispatcher.js');
var pollService = require('../services/pollService.js');

var store = function() {
    var listeners = [];             // collection of functions

    var getPolls = function(cb) {
        pollService.getPolls().then(function (res) {
            cb(res);
        })
    }

    var onChange = function(listener) {
        getPolls(listener);
        listeners.push(listener);
    }

    var addPoll = function(poll) {
        pollService.addPoll(poll).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var editPoll = function(poll) {
        pollService.editPoll(poll).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var deletePoll = function(poll) {
        pollService.deletePoll(poll).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

	var addVote = function(vote) {
        pollService.addVote(vote).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

	var addOption = function(option) {
        pollService.addOption(option).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

	var deleteOption = function(option) {
        pollService.deleteOption(option).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var triggerListeners = function() {
        getPolls(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'poll') {
            switch (split[1]) {
                case "addPoll":
                    addPoll(payload.object);
                    break;
                case "deletePoll":
                    deletePoll(payload.object);
                    break;
                case "editPoll":
                    editPoll(payload.object);
                    break;
				case "addVote":
                    addVote(payload.object);
                    break;
				case "addOption":
                    addOption(payload.object);
                    break;
				case "deleteOption":
                    deleteOption(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange
    }
}

module.exports = store();
