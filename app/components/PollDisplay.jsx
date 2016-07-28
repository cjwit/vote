var React = require('react');
var PollList = require('./PollList.jsx');
var CreatePollForm = require('./CreatePollForm.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			pollSorting: 'dateRecent',
			pollFilter: ""
		}
	},

	sortSelector: function(e) {
		e.preventDefault();
		this.setState({ pollSorting: e.target.id });
	},

	filterPolls: function(obj) {
		var filter = this.state.pollFilter.toLowerCase();
		var foundFilter = false;
		var name = obj.name.toLowerCase();
		if (name.indexOf(filter) > -1) {
			foundFilter = true;
		}
		obj.options.forEach(function(option) {
			var optionName = option.name.toLowerCase();
			if (optionName.indexOf(filter) > -1) {
				foundFilter = true;
			}
		})
		return foundFilter;
	},

	sortPolls: function() {
		var polls = this.props.polls;
		var filterPolls = this.filterPolls;
		var filteredPolls = polls.filter(filterPolls);
		switch(this.state.pollSorting) {
			case 'dateRecent':
				filteredPolls.sort(function(a, b) {
					var aDate = new Date(a.date);
					var bDate = new Date(b.date);
					return bDate - aDate;
				});
				return filteredPolls;
				break;
			case 'dateOldest':
				filteredPolls.sort(function(a, b) {
					var aDate = new Date(a.date);
					var bDate = new Date(b.date);
					return aDate - bDate;
				});
				return filteredPolls;
				break;
			case 'nameAZ':
				filteredPolls.sort(function(a, b) {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				});
				return filteredPolls;
				break;
			case 'nameZA':
				filteredPolls.sort(function(a, b) {
					if (a.name > b.name) { return -1; }
					if (a.name < b.name) { return 1; }
					return 0;
				});
				return filteredPolls;
				break;
			case 'mostVotes':
				filteredPolls.sort(function(a, b) {
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
				return filteredPolls;
				break;
		}
	},

	handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
	},

	render: function() {
		// get login info for navigation
		var username = "",
			loggedIn = this.props.login.status;

		if (loggedIn) {
			username = this.props.login.user.username;
		}

		var polls = this.sortPolls();

		return (
			<div className="row">
				<div className="col-sm-4 col-sm-offset-2">
					{ this.props.creating ?
						<CreatePollForm login = { this.props.login }/>
						:
						<div id = "searchAndSort">
							<h2>Search</h2>
							<div className="form-group">
			                    <input type="text" className="form-control"
			                           id="pollFilter"
			                           name = 'pollFilter'
			                           placeholder="Search"
			                           value = { this.state.pollFilter }
			                           onChange = { this.handleInputChange } />
			                </div>
							<h2>Sort By</h2>
							<p>
								<span id = "mostVotes" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Most Popular</span>
								<span id = "dateRecent" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Newest</span>
								<span id = "dateOldest" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Oldest</span>
								<span id = "nameAZ" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">A-Z</span>
								<span id = "nameZA" onClick = { this.sortSelector } className="btn btn-default btn-xs sort-selector" role="button">Z-A</span>
							</p>
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
