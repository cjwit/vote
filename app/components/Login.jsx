var React = require('react');
var auth = require('../actions/authActions.js');
var router = require('react-router');
var browserHistory = router.browserHistory;

module.exports = React.createClass({
	getInitialState() {
		return {
			error: false
		}
	},

	openSigninForm: function() {
		$("#createAccountForm").addClass('hidden');
		$("#signinForm").removeClass('hidden');
	},

	openCreateAccountForm: function() {
		$("#signinForm").addClass('hidden');
		$("#createAccountForm").removeClass('hidden');
	},

	handleSubmit(event) {
		event.preventDefault();
		var username = this.refs.usernameInput.value;
		var password = this.refs.passwordInput.value;
		var _this = this;
		var props = this.props;
		auth.login({ username: username, password: password }, function(loggedIn) {
			if (!loggedIn) {
				return _this.setState({ error: true });
			}
			browserHistory.push('/user/fakename'); // switch to received object from passport
		});
	},

    render: function() {
		return (
			<div className="container">

		        <div className="row">
					<div className="col-sm-12 text-center">
						<div className="btn-group" role="group" aria-label="...">
							<button type="button" id="signinSelector" className="btn btn-default" onClick={ this.openSigninForm }>Sign In</button>
							<button type="button" id="createAccountSelector" className="btn btn-default" onClick={ this.openCreateAccountForm }>Create Account</button>
						</div>
					</div>
		            <div id="signinForm" className="col-sm-6 col-sm-offset-3 loginForm">
		                <form action="/api/auth/login" method="post" >
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
		            <div id="createAccountForm" className="col-sm-6 col-sm-offset-3 hidden loginForm">
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
