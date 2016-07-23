var dispatcher = require('../dispatcher');

module.exports = {
    addUser: function(user) {
        dispatcher.dispatch({
            object: user,
            type: "user:addUser"
        });
    },

	deleteUser: function(user) {
		dispatcher.dispatch({
			object: user,
			type: "user:deleteUser"
		});
	},

	editUser: function(user) {
		dispatcher.dispatch({
			object: user,
			type: "user:editUser"
		});
	}
}
