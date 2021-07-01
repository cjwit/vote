var $ = require('jquery');
var resourceURL = location.protocol + '//' + location.host + '/api/polls';

module.exports = {
    getPolls: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                method: "GET",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        }).catch(function (rejected) {
            console.log(rejected);
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
        }).catch(function (rejected) {
            console.log(rejected);
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
        }).catch(function (rejected) {
            console.log(rejected);
        });
    },

    deletePoll: function (poll) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + "/" + poll.id,
                data: JSON.stringify(poll),
                method: "DELETE",
                dataType: 'json',
                contentType: 'application/json',
                success: function(res) {
                    console.log(`Deleted ${res}`);
                    window.location.href = '/';
                },
                error: reject
            })
        }).catch(function (rejected) {
            console.log(rejected);
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
        }).catch(function (rejected) {
            console.log(rejected);
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
        }).catch(function (rejected) {
            console.log(rejected);
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
        }).catch(function (rejected) {
            console.log(rejected);
        });
    }
}
