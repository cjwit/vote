var React = require('react');
var MiniPoll = require('./MiniPoll.jsx');
var CreatePollForm = require('./CreatePollForm.jsx');

module.exports = React.createClass({
	componentDidMount: function() {
		$("#newPollButton").click(function() {
			$("#newPollForm").toggleClass("hidden");
			$("#searchAndSort").toggleClass("hidden");
		})
	},

	render: function() {
		var loggedIn = this.props.state.loggedIn,
			username = this.props.state.username,
			polls = this.props.state.polls;

		console.log(polls);
		var MiniPolls = [];
		polls.forEach(function(poll, index) {
			MiniPolls.push(<MiniPoll name = { poll.name } options = { poll.options } key = { "poll" + index } />)
		})
		return (
			<div>
				<div className="container">
					<div className="header">
						<h1>Vote!</h1>
						<h2>Easily create, share, and vote in polls</h2>

						{ loggedIn ?
							<p>Logged in as { username }</p>
							:
							<p>Not logged in</p>
						}

						<p><span id = "newPollButton" className="btn btn-primary btn-lg" role="button">Create a new poll</span></p>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-4 col-sm-offset-2">
							<CreatePollForm state = { this.props.state }/>
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
			</div>
        )
    }
});
