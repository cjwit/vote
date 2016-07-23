var React = require('react');
var Footer = require('./Footer.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
	render: function() {
		// get login info for navigation
		var username = "";
		if (this.props.login.status) {
			username = this.props.login.user.username;
		}
		return (
			<div>
				<Nav active = { "home" } login = { this.props.login } />
				<div className = "container">
					<h1>Home page</h1>
					<p>Logged in? { this.props.login.status ? "Yes" : "No" }{ username !== "" ? ", " + username : null}</p>
					<p>Polls: { this.props.polls.length }</p>
				</div>
				<Footer />
			</div>
        )
    }
});
