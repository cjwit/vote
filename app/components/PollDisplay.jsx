import React, { Component, PropTypes } from 'react';
var PollList = require('./PollList.jsx');
import CreatePollForm from './CreatePollForm.jsx';

export default class PollDisplay extends Component {
	state = {
		pollSorting: 'dateRecent',
		pollFilter: ""
	}

	sortSelector = (e) => {
		e.preventDefault();
		this.setState({ pollSorting: e.target.id });
	}

	filterPolls = (obj) => {
		const filter = this.state.pollFilter.toLowerCase();
		let foundFilter = false;
		const name = obj.name.toLowerCase();
		if (name.includes(filter)) {
			foundFilter = true;
		}
		obj.options.forEach((option) => {
			const optionName = option.name.toLowerCase();
			if (optionName.includes(filter)) {
				foundFilter = true;
			}
		})
		return foundFilter;
	}

	sortPolls() {
		const filteredPolls = this.props.polls.filter(this.filterPolls);
		switch(this.state.pollSorting) {
			case 'dateRecent':
				filteredPolls.sort((a, b) => {
					var aDate = new Date(a.date);
					var bDate = new Date(b.date);
					return bDate - aDate;
				});
				return filteredPolls;
				break;
			case 'dateOldest':
				filteredPolls.sort((a, b) => {
					var aDate = new Date(a.date);
					var bDate = new Date(b.date);
					return aDate - bDate;
				});
				return filteredPolls;
				break;
			case 'nameAZ':
				filteredPolls.sort((a, b) => {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				});
				return filteredPolls;
				break;
			case 'nameZA':
				filteredPolls.sort((a, b) => {
					if (a.name > b.name) { return -1; }
					if (a.name < b.name) { return 1; }
					return 0;
				});
				return filteredPolls;
				break;
			case 'mostVotes':
				filteredPolls.sort((a, b) => {
					var aVotes = 0;
					var bVotes = 0;
					a.options.forEach((option) => aVotes += option.votes)
					b.options.forEach((option) => bVotes += option.votes)
					return bVotes - aVotes;
				});
				return filteredPolls;
				break;
		}
	}

	handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        const state = this.state;
        state[name] = value;
        this.setState(state);
	}

	render() {
		// get login info for navigation
		let username = "",
			loggedIn = this.props.login.status;

		if (loggedIn) {
			username = this.props.login.user.username;
		}

		var polls = this.sortPolls();

		return (
			<div className="row">
				<div className="col-sm-4 col-sm-offset-2">
					{ this.props.creating ?
						<CreatePollForm login = { this.props.login } pollNames = { this.props.polls.map((p) => p.name.toLowerCase()) }/>
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
}
