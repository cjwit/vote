var React = require('react');
var PollDisplay = require('./PollDisplay.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			creating: false,
			pollSorting: 'dateRecent'
		}
	},

	componentDidMount: function() {
		var _this = this;
		$("#newPollButton").click(function() {
			_this.setState({ creating: !_this.state.creating });
		});
	},

	render: function() {
		var username = this.props.login.user.username;
		return (
			<div>
				<div className = "row text-center">
					<h1>{ username }</h1>
					<h2>View and edit your polls</h2>
					<p><span id = "newPollButton" className="btn btn-primary btn-lg" role="button">{ this.state.creating ? 'Close Form' : 'Create a new poll' }</span></p>
				</div>
				<PollDisplay creating = { this.state.creating } login = { this.props.login } polls = { this.props.polls } />
			</div>
        )
    }
});
