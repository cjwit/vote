var dispatcher = require('../dispatcher.js');
var service = require('../services/service.js');

var store = function() {
    var listeners = [];             // collection of functions

    var getThings = function(cb) {
        service.getThings().then(function (res) {
            cb(res);
        })
    }

    var onChange = function(listener) {
        getThings(listener);
        listeners.push(listener);
    }

    var addThing = function(event) {
        service.addThing(thing).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var editThing = function(thing) {
        service.editThing(thing).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var deleteThing = function(thing) {
        service.deleteThing(thing).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var triggerListeners = function() {
        getThings(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'thing') {
            switch (split[1]) {
                case "addThing":
                    addThing(payload.object);
                    break;
                case "deleteThing":
                    deleteThing(payload.object);
                    break;
                case "editThing":
                    editThing(payload.object);
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
