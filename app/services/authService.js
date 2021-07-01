var $ = require('jquery');
var resourceURL = location.protocol + '//' + location.host + '/api/';

module.exports = {
    getLoginStatus: function() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'auth',
                method: "GET",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        }).catch(function(rejected) {
            console.log(rejected);
        });
    },

	// currently handling erroneous login info with alert, could be fancier
	login: function(user) {
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
		}).catch(function(rejected) {
            console.log(rejected);
        });
    },

	logout: function() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + 'auth/logout',
                method: "GET",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        }).catch(function(rejected) {
            console.log(rejected);
        });
    },

    addUser: function (user) {
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
        }).catch(function(rejected) {
            console.log(rejected);
        });
    }
}
