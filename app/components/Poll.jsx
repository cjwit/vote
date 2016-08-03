import React, { PropTypes, Component } from 'react';
import DeleteButton from './DeleteButton.jsx';
import BarChart from './BarChart.jsx';
import CircleChart from './CircleChart.jsx';
var actions = require('../actions/pollsActions.js');

export default class Poll extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired,
		poll: PropTypes.object.isRequired
	}

	updateVoteStatus() {
		const voted = JSON.parse(sessionStorage.voted);
		if (voted.indexOf(this.props.poll._id) >= 0) {
			return true;
		}
		return false;
	}

	addVote = (e) => {
		e.preventDefault();
		const voted = JSON.parse(sessionStorage.voted);
		voted.push(this.props.poll._id);
		sessionStorage.setItem('voted', JSON.stringify(voted));
		actions.addVote({ poll: this.props.poll._id, option: e.target.id });
	}

    render() {
		const poll = this.props.poll,
			options = poll.options,
			optionButtons = [],
			addVote = this.addVote,
			login = this.props.login,
			voted = this.updateVoteStatus();

		options.map((option, index) => {
			var voteButton = <button id = { option.name } className = "btn btn-default btn-sm vote-button" onClick = { addVote } disabled = { voted }>{ option.votes }</button>
			var optionStyle = { color: actions.pollColors(index) };
			var optionName = <span style = { optionStyle }>{ option.name }</span>
			// only show deleteButton if logged in
			optionButtons.push( <div className = "poll-option" key = { 'option' + index }>
									<p>
										{ voteButton }
										{ optionName }
										{ login.status ?
											<DeleteButton poll = { poll } deleteFunction = { actions.deleteOption } valueToDelete = { option.name } />
											:
											null
										}
									</p>
								</div> )
		});

		return (
			<div>
				<h1></h1>
				<CircleChart poll = { poll } pollPage = { true } />
				<BarChart poll = { poll } />
				{ optionButtons }
			</div>
		)
    }
}
