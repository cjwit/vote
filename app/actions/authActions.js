var dispatcher = require('../dispatcher');

module.exports = {
    login: function(payload) {
		console.trace("login called from authActions", payload);
        dispatcher.dispatch({
            object: payload,
            type: "auth:login"
        });
    },

	logout: function(payload) {
		console.log("logout called from authActions");
        dispatcher.dispatch({
            object: payload,
            type: "auth:logout"
        });
    },

	loggedIn: function(payload) {
		console.log("loggedIn called from authActions");
		dispatcher.dispatch({
            object: payload,
            type: "auth:loggedIn"
        });
    }
}
