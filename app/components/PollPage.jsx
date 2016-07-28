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
				<Nav active = { "poll" } login = { this.props.login } />
				<div className = "container">
					<h1>Poll page</h1>
					<p>Logged in? { this.props.login.status ? "Yes" : "No" }{ username !== "" ? ", " + username : null}</p>
					<p>Poll Name: { this.props.poll.name === "" ? "undefined" : this.props.poll.name }</p>
				</div>
				<Footer />
			</div>
        )
    }
});
