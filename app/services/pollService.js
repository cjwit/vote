var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/polls';

module.exports = {
    getPolls: function() {
        var Promise = promise.Promise;
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

	// getPoll?

    addPoll: function (poll) {
        var Promise = promise.Promise;
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
        var Promise = promise.Promise;
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
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + poll._id,
                method: "DELETE",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

	addVote: function (vote) {
        var Promise = promise.Promise;
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
		var Promise = promise.Promise;
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
		var Promise = promise.Promise;
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
