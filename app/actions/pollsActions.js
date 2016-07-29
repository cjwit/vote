var dispatcher = require('../dispatcher');
var colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

module.exports = {
	pollColors: function(index) {
		return colors[index % colors.length];
	},

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
	},

	addOption: function(option) {
		dispatcher.dispatch({
			object: option,
			type: "poll:addOption"
		});
	},

	deleteOption: function(option) {
		dispatcher.dispatch({
			object: option,
			type: "poll:deleteOption"
		});
	}
}
