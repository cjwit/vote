var React = require('react');
var actions = require('../actions/pollsActions.js');

module.exports = React.createClass({
	addVote: function(e) {
		e.preventDefault();
		actions.addVote({ poll: this.props.poll._id, option: e.target.id });
	},

    render: function() {
		var options = this.props.poll.options;
		var optionButtons = [];
		var addVote = this.addVote;
		options.map(function(option, index) {
			var vote = <button id = { option.name } className = "btn btn-default btn-sm" onClick = { addVote }>{ option.votes } - { option.name }</button>
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
