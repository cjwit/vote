var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/';

module.exports = {
    getLoginStatus: function() {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'auth',
                method: "GET",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

	login: function(user) {
		var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'auth/login',
                data: JSON.stringify(user),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
		});
    },

	logout: function() {
		var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'auth/logout',
                method: "GET",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

    addUser: function (user) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'register',
                data: JSON.stringify(user),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    }
}
