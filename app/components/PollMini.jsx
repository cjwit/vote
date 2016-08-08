import React, { Component, PropTypes } from 'react';
import CircleChart from './CircleChart.jsx';
var actions = require('../actions/pollsActions.js');

export default class PollMini extends Component {
	static propTypes = {
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
			voted = this.updateVoteStatus(),
			pollUrl = "/polls/" + poll._id;

			options.map((option, index) => {
				const voteButton = <button id = { option.name } className = "btn btn-default btn-sm mini-vote-button" onClick = { addVote } disabled = { voted }>{ option.votes }</button>
				const optionStyle = { color: actions.pollColors(index) };
				const optionName = <span style = { optionStyle }>{ option.name }</span>
				optionButtons.push( <div className = "mini-option" key = { 'option' + index }>
										<p>
											{ voteButton }
											{ optionName }
										</p>
									</div> )
		});

		return (
			<div className = "mini-poll">
				<p className = "mini-name"><a href = { pollUrl }>{ poll.name }</a></p>
				<CircleChart poll = { poll } pollPage = { false } />
				{ optionButtons }
			</div>
		)
	}
}
