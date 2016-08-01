var React = require('react');

module.exports = React.createClass({
	render: function() {
		var username = this.props.login.user.username;
		return (
			<div>
				<h1>User page</h1>
				<p>Logged in as { username }</p>
				<p>Polls: { this.props.polls.length }</p>
			</div>
        )
    }
});
