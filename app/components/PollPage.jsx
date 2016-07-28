var React = require('react');
var Poll = require('./Poll.jsx');
var AddOption = require('./AddOption.jsx');
var Footer = require('./Footer.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
	render: function() {
		// get login info for navigation: add edit button if user is the owner
		var username = "",
			poll = this.props.poll,
			pollUrl = window.location.href,
			login = this.props.login;

		if (login.status) {
			username = login.user.username;
		}

		return (
			<div>
				<Nav active = { "poll" } login = { login } />
				<div className = "container">
					<div className = "row">
						<div className = "col-sm-8 col-sm-offset-2">
							<h1>{ poll.name }</h1>
							<p>Logged in? { login.status ? "Yes" : "No" }{ username !== "" ? ", " + username : null}</p>
							<p>Share: <a href = { pollUrl }>Link</a></p>
							<AddOption poll = { poll } login = { login } />
						</div>
						<div className = "col-sm-8 col-sm-offset-2 text-center">
							<Poll login = { login } poll = { poll } />
						</div>
					</div>

				</div>
				<Footer />
			</div>
        )
    }
});
