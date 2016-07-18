var dispatcher = require('../dispatcher');

module.exports = {
    // called from the Thing component
    login: function(payload) {
		console.log("login called from authActions");
        dispatcher.dispatch({
            object: payload,
            type: "auth:login"
        });
    },

	logout: function(payload) {
		console.log("logout called from authActions");
        dispatcher.dispatch({
            object: payload,
            type: "auth:logout"
        });
    },

	loggedIn: function(payload) {
		console.log("loggedIn called from authActions");
		dispatcher.dispatch({
            object: payload,
            type: "auth:loggedIn"
        });
    },

	loginOLD: function(username, pass, cb) {
		console.log('auth.login');
		cb = arguments[arguments.length - 1]
		if (localStorage.token) {
			if (cb) cb(true)
			this.onChange(true)
			return
		}

		// change pretentReqeust to a call to store/service using template from above
		this.pretendRequest(username, pass, (res) => {
			if (res.authenticated) {
				localStorage.token = res.token
				if (cb) cb(true)
				this.onChange(true)
			} else {
				if (cb) cb(false)
				this.onChange(false)
			}
		})
	},

	pretendRequest: function(username, pass, cb) {
		console.log('auth.pretendRequest');
		setTimeout(function() {
			if (username === 'joe' && pass === 'pwd') {
				cb({
					authenticated: true,
					token: Math.random().toString(36).substring(7)
				})
			} else {
				cb({ authenticated: false })
			}
		}, 0)
	},

	getToken() {
		console.log('auth.getToken');
		return localStorage.token
	},

	logoutOLD(cb) {
		console.log('auth.logout');
		delete localStorage.token
		if (cb) cb()
		this.onChange(false)
	},

	loggedInOLD() {
		return !!localStorage.token
	},

	onChange() {}
}
