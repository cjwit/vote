var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/';

module.exports = {
    loggedIn: function() {
		console.log("loggedIn called from authService");
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
		console.log("login called from authService", user);
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
		console.log("logout called from authService");
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
                url: resourceURL + 'user',
                data: JSON.stringify(user),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    editUser: function (user) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'user/' + user.id,
                data: JSON.stringify(user),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    deleteUser: function(user) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'user/' + user._id,
                method: "DELETE",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    }
}
