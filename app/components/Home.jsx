var React = require('react');
var MiniPoll = require('./MiniPoll.jsx');

module.exports = React.createClass({
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

						<p><a className="btn btn-primary btn-lg" href="#" role="button" disabled={ loggedIn ? "true" : "false" } >Create a new poll</a></p>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-4 col-sm-offset-2">
							<h2>Create a New Poll</h2>
							<div id="newPollForm">
								<form action="/api/polls" method="post" >
									<div className="form-group">
										<label htmlFor="nameInput">Name of your poll:</label>
										<input type="text" className="form-control" id="nameInput" ref="nameInput" name="name" />
									</div>
									<div className="form-group">
										<label htmlFor="optionsInput">List options, separated by commas:</label>
										<input type="text" className="form-control" id="optionsInput" ref="optionsInput" name="options" />
									</div>
									<input type="submit" className="btn btn-primary" value="Create New Poll" />
								</form>
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
