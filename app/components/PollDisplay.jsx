var React = require('react');
var PollList = require('./PollList.jsx');
var CreatePollForm = require('./CreatePollForm.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			pollSorting: 'dateRecent'
		}
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

		return (
			<div className="row">
				<div className="col-sm-4 col-sm-offset-2">
					{ this.props.creating ?
						<CreatePollForm login = { this.props.login }/>
						:
						<div id = "searchAndSort">
							<h2>Sort Polls By</h2>
							<p><span id = "mostVotes" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Number of Votes</span></p>
							<div className = "btn-group btn-group-justified" role = "group" aria-label = "...">
								<button type = "button" id = "dateRecent" onClick = { this.sortSelector } className="btn btn-default sort-selector">Newest</button>
								<button type = "button" id = "dateOldest" onClick = { this.sortSelector } className="btn btn-default sort-selector">Oldest</button>
							</div>
							<div className = "btn-group btn-group-justified" role = "group" aria-label = "...">
								<button type = "button" id = "nameAZ" onClick = { this.sortSelector } className="btn btn-default sort-selector">Name (A-Z)</button>
								<button type = "button" id = "nameZA" onClick = { this.sortSelector } className="btn btn-default sort-selector">Name (Z-A)</button>
							</div>
							<h2>Search</h2>
						</div>
					}
				</div>
				<div className="col-sm-4">
					<h2>Recent Polls</h2>
					<PollList polls = { polls } login = { this.props.login } />
				</div>
			</div>
        )
    }
});
