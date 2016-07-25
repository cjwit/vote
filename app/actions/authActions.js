var dispatcher = require('../dispatcher');

module.exports = {
    login: function(payload) {
        dispatcher.dispatch({
            object: payload,
            type: "auth:login"
        });
    },

	logout: function(payload) {
		dispatcher.dispatch({
            object: payload,
            type: "auth:logout"
        });
    },

	getLoginStatus: function(payload) {
		dispatcher.dispatch({
            object: payload,
            type: "auth:getLoginStatus"
        });
    },

	addUser: function(payload) {
		dispatcher.dispatch({
			object: payload,
			type: "auth:addUser"
		});
	}
}
