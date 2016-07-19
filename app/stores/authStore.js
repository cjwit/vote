var dispatcher = require('../dispatcher.js');
var authService = require('../services/authService.js');

var store = function() {
    var listeners = [];             // collection of functions

    var loggedIn = function(cb) {
		console.log("loggedIn called from authStore");
        authService.loggedIn().then(function (res) {
            cb(res);
        })
    }

    var onChange = function(listener) {
        loggedIn(listener);
        listeners.push(listener);
    }

	var login = function(user) {
		console.log("login called from authStore", user);
        authService.login(user).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

	var logout = function(thing) {
		console.log("logout called from authStore");
        authService.logout(thing).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var addUser = function(event) {
        authService.addUser(thing).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var editUser = function(thing) {
        authService.editUser(thing).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var deleteUser = function(thing) {
        authService.deleteUser(thing).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var triggerListeners = function() {
        loggedIn(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'auth') {
            switch (split[1]) {
                case "addUser":
                    addUser(payload.object);
                    break;
                case "deleteUser":
                    deleteUser(payload.object);
                    break;
                case "editUser":
                    editUser(payload.object);
                    break;
				case "loggedIn":
                    loggedIn(payload.object);
                    break;
				case "login":
                    login(payload.object);
                    break;
				case "logout":
                    logout(payload.object);
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
