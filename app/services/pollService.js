var $ = require('jquery');
var resourceURL = location.protocol + '//' + location.host + '/api/polls';

module.exports = {
    getPolls: function() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                method: "GET",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

    addPoll: function (poll) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                data: JSON.stringify(poll),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    editPoll: function (poll) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + "/" + poll.id,
                data: JSON.stringify(poll),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    deletePoll: function(poll) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + "/" + poll.id,
                method: "DELETE",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

	addVote: function (vote) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + "/vote/" + vote.poll,
                data: JSON.stringify(vote),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

	addOption: function (option) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: resourceURL + "/option/" + option.id,
				data: JSON.stringify(option),
				method: "POST",
				dataType: 'json',
				contentType: 'application/json',
				success: resolve,
				error: reject
			});
		});
	},

	deleteOption: function (option) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: resourceURL + "/option/" + option.id,
				data: JSON.stringify(option),
				method: "DELETE",
				dataType: 'json',
				contentType: 'application/json',
				success: resolve,
				error: reject
			});
		});
	}
}
