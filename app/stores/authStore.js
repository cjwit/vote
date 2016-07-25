var dispatcher = require('../dispatcher.js');
var authService = require('../services/authService.js');

var LoginStore = function() {
    var listeners = [];             // collection of functions
    var currentUser = {
        status: false,
        user: null
    }

    var getUser = function(cb) {
        cb(currentUser);
    }

    var onChange = function(listener) {
        getUser(listener);
        listeners.push(listener);
    }

    var login = function(loginObject) {
        authService.login(loginObject).then(function (res) {
            console.log(res);
            currentUser = {
                status: true,
                user: {
					username: res
				}
            };
            triggerListeners();
        })
    }

	var getLoginStatus = function(loginObject) {
		console.log("store getLoginStatus called");
		authService.getLoginStatus(loginObject).then(function (res) {
            console.log(res);
			if (res === false) {
				currentUser = {
					status: false,
					user: null
				};
			} else {
				currentUser = {
					status: true,
					user: {
						username: res
					}
				};
			}
            triggerListeners();
        })
    }

    var logout = function() {
		authService.logout(loginObject).then(function (res) {
			console.log(res);
			currentUser = {
				status: false,
				user: null
			};
			triggerListeners();
		})
        triggerListeners();
    }

    var triggerListeners = function() {
        getUser(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'auth') {
            switch (split[1]) {
				case "getLoginStatus":
                    getLoginStatus();
                    break;
                case "login":
                    login(payload.object);
                    break;
                case "logout":
                    logout();
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange
    }
}

module.exports = LoginStore();
