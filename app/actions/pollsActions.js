var dispatcher = require('../dispatcher');

module.exports = {
    // called from the Poll component
    addPoll: function(poll) {
        dispatcher.dispatch({
            object: poll,
            type: "poll:addPoll"
        });
    },

	deletePoll: function(poll) {
		dispatcher.dispatch({
			object: poll,
			type: "poll:deletePoll"
		});
	},

	editPoll: function(poll) {
		dispatcher.dispatch({
			object: poll,
			type: "poll:editPoll"
		});
	},

	addVote: function(vote) {
		dispatcher.dispatch({
			object: vote,
			type: "poll:addVote"
		});
	}
}
