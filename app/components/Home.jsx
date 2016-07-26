var React = require('react');
var MiniPoll = require('./MiniPoll.jsx');
var CreatePollForm = require('./CreatePollForm.jsx');
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
			$("#newPollForm").toggleClass("hidden");
			$("#searchAndSort").toggleClass("hidden");
		});
	},

	sortSelector: function(e) {
		e.preventDefault();
		this.setState({ pollSorting: e.target.id });
	},

	sortPolls: function(polls) {
		switch(this.state.pollSorting) {
			case 'dateRecent':
				polls.sort(function(a, b) {
					var aDate = new Date(a.date);
					var bDate = new Date(b.date);
					return bDate - aDate;
				});
				return polls;
				break;
			case 'dateOldest':
				polls.sort(function(a, b) {
					var aDate = new Date(a.date);
					var bDate = new Date(b.date);
					return aDate - bDate;
				});
				return polls;
				break;
			case 'nameAZ':
				polls.sort(function(a, b) {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				});
				return polls;
				break;
			case 'nameZA':
				polls.sort(function(a, b) {
					if (a.name > b.name) { return -1; }
					if (a.name < b.name) { return 1; }
					return 0;
				});
				return polls;
				break;
			case 'mostVotes':
				polls.sort(function(a, b) {
					var aVotes = 0;
					var bVotes = 0;
					a.options.forEach(function(option) {
						aVotes += option.votes;
					})
					b.options.forEach(function(option) {
						bVotes += option.votes;
					})
					return bVotes - aVotes;
				});
				return polls;
				break;
		}
	},

	render: function() {
		// get login info for navigation
		var username = "",
			loggedIn = this.props.login.status,
			polls = this.props.polls;

		if (loggedIn) {
			username = this.props.login.user.username;
		}

		polls = this.sortPolls(polls);

		var MiniPolls = [];
		polls.forEach(function(poll, index) {
			MiniPolls.push(<MiniPoll poll = { poll } key = { "poll" + index } />)
		});

		return (
			<div>
				<Nav active = { "home" } login = { this.props.login } />
				<div className = "container">
					<div className = "row text-center">
						<h1>Vote!</h1>
						<h2>Easily create, share, and vote in polls</h2>

						{ loggedIn ?
							<p>Logged in as { username }</p>
							:
							<p>Not logged in</p>
						}

						<p><span id = "newPollButton" className="btn btn-primary btn-lg" role="button">{ this.state.creating ? 'Close Form' : 'Create a new poll' }</span></p>
					</div>

					<div className="row">
						<div className="col-sm-4 col-sm-offset-2">
							<div id = "newPollForm" className = "hidden">
								<CreatePollForm login = { this.props.login }/>
							</div>
							<div id = "searchAndSort">
								<h2>Sort Polls By:</h2>
								<p><span id = "mostVotes" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Number of Votes</span></p>
								<p><span id = "dateRecent" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Most Recent</span></p>
								<p><span id = "dateOldest" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Creation Date</span></p>
								<p><span id = "nameAZ" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Name (A-Z)</span></p>
								<p><span id = "nameZA" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Name (Z-A)</span></p>
								<h2>Search</h2>
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
