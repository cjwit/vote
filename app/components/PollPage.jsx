var React = require('react');
var Poll = require('./Poll.jsx');
var InputSubmit = require('./InputSubmit.jsx');
var Footer = require('./Footer.jsx');
var Nav = require('./Nav.jsx');
var actions = require('../actions/pollsActions');

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
							<InputSubmit poll = { poll } login = { login } submitFunction = { actions.editPoll } placeholder = "Edit" />
							<p>Logged in? { login.status ? "Yes" : "No" }{ username !== "" ? ", " + username : null}</p>
							<p>Share: <a href = { pollUrl }>Link</a></p>
						</div>
						<div className = "col-sm-8 col-sm-offset-2 text-center">
							<Poll login = { login } poll = { poll } />
							<InputSubmit poll = { poll } login = { login } submitFunction = { actions.addOption } placeholder = "Add An Option" />
						</div>
					</div>

				</div>
				<Footer />
			</div>
        )
    }
});
