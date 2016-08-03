import React from 'react';
import CircleChart from './CircleChart.jsx';
var actions = require('../actions/pollsActions.js');

module.exports = React.createClass({
	updateVoteStatus: function() {
		var voted = JSON.parse(sessionStorage.voted);
		if (voted.indexOf(this.props.poll._id) >= 0) {
			return true;
		}
		return false;
	},

	addVote: function(e) {
		e.preventDefault();
		var voted = JSON.parse(sessionStorage.voted);
		voted.push(this.props.poll._id);
		sessionStorage.setItem('voted', JSON.stringify(voted));
		actions.addVote({ poll: this.props.poll._id, option: e.target.id });
	},

    render: function() {
		var poll = this.props.poll,
			options = poll.options,
			optionButtons = [],
			addVote = this.addVote,
			voted = this.updateVoteStatus(),
			pollUrl = "/polls/" + poll._id;

			options.map(function(option, index) {
				var voteButton = <button id = { option.name } className = "btn btn-default btn-sm mini-vote-button" onClick = { addVote } disabled = { voted }>{ option.votes }</button>
				var optionStyle = { color: actions.pollColors(index) };
				var optionName = <span style = { optionStyle }>{ option.name }</span>
				// only show deleteButton if logged in
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
});
