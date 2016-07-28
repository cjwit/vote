var React = require('react');
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

	deleteOption: function(e) {
		e.preventDefault();
		var option = { id: this.props.poll._id, option: e.target.id }
		actions.deleteOption(option);
	},

    render: function() {
		var poll = this.props.poll,
			options = poll.options,
			optionButtons = [],
			addVote = this.addVote,
			deleteOption = this.deleteOption,
			voted = this.updateVoteStatus();

		options.map(function(option, index) {
			var voteButton = <button id = { option.name } className = "btn btn-default btn-sm vote-button" onClick = { addVote } disabled = { voted }>{ option.votes }</button>
			var deleteButton = <button id = { option.name } className = "btn btn-danger btn-sm delete-option-button" onClick = { deleteOption } >&#10006;</button>
			optionButtons.push(<div className = "poll-option" key = { 'option' + index }><p>{ voteButton } { option.name } { deleteButton }</p></div>)
		});

		return (
			<div>
				<h1></h1>
				<div className = "poll-results" />
				{ optionButtons }
			</div>
		)
    }
});
