var React = require('react');
var MiniPoll = require('./MiniPoll.jsx');
var CreatePollForm = require('./CreatePollForm.jsx');
var Footer = require('./Footer.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
	componentDidMount: function() {
		$("#newPollButton").click(function() {
			$("#newPollForm").toggleClass("hidden");
			$("#searchAndSort").toggleClass("hidden");
		})
	},

	render: function() {
		// get login info for navigation
		var username = "",
			loggedIn = this.props.login.status,
			polls = this.props.polls;

		if (loggedIn) {
			username = this.props.login.user.username;
		}

		console.log(polls);
		var MiniPolls = [];
		polls.forEach(function(poll, index) {
			MiniPolls.push(<MiniPoll name = { poll.name } options = { poll.options } key = { "poll" + index } />)
		})

		return (
			<div>
				<Nav active = { "home" } login = { this.props.login } />
				<div className = "container">
					<div className = "row">
						<h1>Vote!</h1>
						<h2>Easily create, share, and vote in polls</h2>

						{ loggedIn ?
							<p>Logged in as { username }</p>
							:
							<p>Not logged in</p>
						}

						<p><span id = "newPollButton" className="btn btn-primary btn-lg" role="button">Create a new poll</span></p>
					</div>

					<div className="row">
						<div className="col-sm-4 col-sm-offset-2">
							<div id = "newPollForm" className = "hidden">
								<CreatePollForm login = { this.props.login }/>
							</div>
							<div id = "searchAndSort">
								<h2>Search and Sort Logic</h2>
								<p>Add to individual component later.</p>
							</div>
						</div>
						<div className="col-sm-4">
							<h2>Recent Polls</h2>
							{ MiniPolls }
						</div>
					</div>

				</div>

				<Footer />
			</div>
        )
    }
});
