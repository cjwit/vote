var React = require('react');
var PollDisplay = require('./PollDisplay.jsx');
var Footer = require('./Footer.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			creating: false,
			pollSorting: 'dateRecent'
		}
	},

	componentDidMount: function() {
		var _this = this;
		$("#newPollButton").click(function() {
			_this.setState({ creating: !_this.state.creating });
		});
	},

	render: function() {
		// get login info for navigation
		var username = "",
			loggedIn = this.props.login.status;

		if (loggedIn) {
			username = this.props.login.user.username;
		}

		return (
			<div>
				<Nav active = { "home" } login = { this.props.login } />
				<div className = "container">
					<div className = "row text-center">
						<h1>Vote!</h1>
						<h2>Easily create, share, and vote in polls (edited)</h2>

						{ loggedIn ?
							<p>Logged in as { username }</p>
							:
							<p>Not logged in</p>
						}

						<p><span id = "newPollButton" className="btn btn-primary btn-lg" role="button">{ this.state.creating ? 'Close Form' : 'Create a new poll' }</span></p>
					</div>
					<PollDisplay creating = { this.state.creating } login = { this.props.login } polls = { this.props.polls } />
				</div>

				<Footer />
			</div>
        )
    }
});
