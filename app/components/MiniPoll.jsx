var React = require('react');

module.exports = React.createClass({
    render: function() {
		console.log(this.props)
		var options = this.props.poll.options;
		var optionButtons = [];
		options.map(function(option, index) {
			optionButtons.push(<div className = "mini-option" key = { 'option' + index }><p>{ option.name }: { option.votes }</p></div>)
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
