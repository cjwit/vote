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
			const voteButton = <button id = { option.name } className = "btn btn-default btn-sm vote-button" onClick = { addVote } disabled = { voted }>{ option.votes }</button>
			const optionStyle = { color: actions.pollColors(index) };
			const optionName = <span style = { optionStyle }>{ option.name }</span>

			// create delete button only if current user is the poll's owner
			let deleteButton;
			if (login.status === true) {
				deleteButton = login.user.username === poll.owner ?
					<DeleteButton poll = { poll } deleteFunction = { actions.deleteOption } valueToDelete = { option.name } />
					:
					null;
			}

			optionButtons.push( <div className = "poll-option" key = { 'option' + index }>
									<p>
										{ voteButton }
										{ optionName }
										{ deleteButton }
									</p>
								</div> )
		});

		return (
			<div>
				<div className = "row">
					<div className = "poll-chart-display">
						<CircleChart poll = { poll } pollPage = { true } />
						<BarChart poll = { poll } />
					</div>
				</div>
				<div className = "row">
					<div className = "option-buttons">
						{ optionButtons }
					</div>
				</div>
			</div>
		)
    }
}
