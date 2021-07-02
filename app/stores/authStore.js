var dispatcher = require('../dispatcher.js');
var authService = require('../services/authService.js');
var authActions = require('../actions/authActions.js');

var LoginStore = function() {
    var listeners = [];             // collection of functions
    var currentUser = {
        status: false,
        user: null,
		error: null
    }

    var getUser = function(cb) {
        cb(currentUser);
    }

    var onChange = function(listener) {
        getUser(listener);
        listeners.push(listener);
    }

	var addUser = function(user) {
		authService.addUser(user).then((res) => {
			console.log(res);
			if (res.message === "error") {
				currentUser = {
	                status: false,
	                user: null,
					error: "Username is taken, try again."
	            };
				triggerListeners();
			} else {
				authActions.login(user);
			}
		});
	}

	var login = function(loginObject) {
		authService.login(loginObject).then((res) => {
            console.log(res);
            currentUser = {
                status: true,
                user: {
					username: res.username
				},
				error: null
            };
            triggerListeners();
			window.location.href = "/user";
        }).catch(() => {
			currentUser = {
                status: false,
                user: null,
				error: "Invalid login information. Try again or create a new account."
            };
			triggerListeners();
		})
    }

	var getLoginStatus = function(loginObject) {
		authService.getLoginStatus(loginObject).then((res) => {
            console.log(res);
			if (res === false) {
				currentUser = {
					status: false,
					user: null,
					error: null
				};
			} else {
				currentUser = {
					status: true,
					user: {
						username: res
					},
					error: null
				};
			}
            triggerListeners();
        }).catch(() => {
			currentUser = {
                status: false,
                user: null,
				error: "There was a problem getting login status."
            };
			triggerListeners();
		})
    }

    var logout = function() {
		authService.logout().then((res) => {
			console.log(res);
			currentUser = {
				status: false,
				user: null,
				error: null
			};
			triggerListeners();
			window.location.href = "/";
		});
    }

    var triggerListeners = function() {
        getUser((res) => {
            listeners.forEach((listener) => {
                listener(res);
            });
        });
    }

    dispatcher.register((payload) => {
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
				case "addUser":
                    addUser(payload.object);
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
