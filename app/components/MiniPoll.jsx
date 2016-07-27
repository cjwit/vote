var React = require('react');
var actions = require('../actions/pollsActions.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			voted: this.updateVoteStatus()
		}
	},

	// not calling at all times. a different pathway through this process is necessary
	componentWillReceiveProps: function() {
		console.log(this.props.poll.name, 'updateVoteStatus called', this.updateVoteStatus());
		this.setState({ voted: this.updateVoteStatus() })
	},

	updateVoteStatus: function() {
		var voted = JSON.parse(sessionStorage.voted);
		console.log((voted.indexOf(this.props.poll._id)));
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
		console.log(this.props.poll.name, 'rendered: voted', this.state.voted, 'sessionStorage', sessionStorage.voted)
		var poll = this.props.poll,
			options = poll.options,
			optionButtons = [],
			addVote = this.addVote,
			voted = this.state.voted;

		options.map(function(option, index) {
			var vote = <button id = { option.name } className = "btn btn-default btn-sm" onClick = { addVote } disabled = { voted }>{ option.votes } - { option.name }</button>
			optionButtons.push(<div className = "mini-option" key = { 'option' + index }><p>{ vote }</p></div>)
		});

		return (
			<div className = "mini-poll">
				<p className = "mini-name">{ this.props.poll.name }</p>
				<div className = "mini-results" />
				{ optionButtons }
			</div>
		)
    }
});
