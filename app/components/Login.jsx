var React = require('react');
var auth = require('../actions/authActions.js')

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
	getInitialState() {
		return {
			error: false
		}
	},

	handleSubmit(event) {
		event.preventDefault();
		var username = this.refs.usernameInput.value;	// not working
		var password = this.refs.passwordInput.value;
		var _this = this;
		auth.login(username, password, function(loggedIn) {
			if (!loggedIn) {
				return _this.setState({ error: true });
			}
			// redirect?
			/*
			const { location } = this.props
			if (location.state && location.state.nextPathname) {
				this.props.router.replace(location.state.nextPathname)
			} else {
				this.props.router.replace('/')
			}
			*/
		})
	},

    render: function() {
		return (
			<div className="container">
		        <div className="row">
		            <div className="col-sm-4 col-sm-offset-2">
		                <form onSubmit= { this.handleSubmit }>
		                    <div className="form-group">
		                        <label htmlFor="usernameInput">Username:</label> Hint: joe
		                        <input type="text" className="form-control" id="usernameInput" ref="usernameInput" name="username" />
		                    </div>
							<div className="form-group">
		                        <label htmlFor="passwordInput">Password:</label> Hint: pwd
		                        <input type="password" className="form-control" id="passwordInput" ref="passwordInput" name="password" />
		                    </div>
		                    <input type="submit" className="btn btn-default" value="Log In" />
		                </form>
						{ this.state.error ? <div className="alert alert-danger">Bad login info</div> : null }
		            </div>
		            <div className="col-sm-4">
		                <form action="/api/user" method="post">
		                    <div className="form-group">
		                        <label htmlFor="usernameInput">Username:</label>
		                        <input type="text" className="form-control" id="usernameInput" name="username" />
		                    </div>
							<div className="form-group">
		                        <label htmlFor="passwordInput">Password:</label>
		                        <input type="password" className="form-control" id="passwordInput" name="password" />
		                    </div>
		                    <input type="submit" className="btn btn-default" value="Create a New Account" />
		                </form>
		            </div>
		        </div>
		    </div>
        )
    }
});
