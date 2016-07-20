var React = require('react');
var Footer = require('./Footer.jsx');
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
var auth = require('../actions/authActions.js')

module.exports = React.createClass({
	getInitialState: function() {
		return {
			loggedIn: false,
			username: ""
		}
	},

	componentDidMount: function() {
		var _this = this;
		this.serverRequest = $.get("/api/auth", function(result) {
			if (result) {
				_this.setState({
					loggedIn: true,
					username: result
				});
			}
		});
	},

	logout: function() {
		var _this = this;
		this.serverRequest = $.get("/api/auth/logout", function(result) {
			if (result) {
				_this.setState({
					loggedIn: false,
					username: ""
				});
			}
		});
	},

	componentWillUnmount: function() {
		this.serverRequest.abort();
	},

	render: function() {
		// get login info for navigation
		var loggedIn = this.state.loggedIn,
			username = this.state.username
		console.log("rendering App, login:", loggedIn, username);

		// build login buttons
		var loginButton, userButton;
		if (loggedIn) {
			loginButton = <Link to="/logout" onClick = { this.logout }>Logout</Link>
			var userLinkString = "/user/" + username;
			userButton = <Link to= { userLinkString } activeClassName="active">My Polls</Link>
		} else {
			loginButton = <Link to="/login" activeClassName="active">Log In</Link>
			userButton = <Link to = "/login">My Polls (requires login)</Link>
		}

		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nabvar-collapse" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<IndexLink className="navbar-brand" to="/" activeClassName="active">Vote!</IndexLink>
						</div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li>{ userButton }</li>
								<li>{ loginButton }</li>
							</ul>
						</div>
					</div>
				</nav>

				<div className="container">App login status is: { loggedIn ? username : "Not logged in" }</div>
				{ this.props.children }
				<Footer />
			</div>
        )
    }
});
