var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<h1>User page</h1>
				<p><a href = "/login">Login</a> to access user information.</p>
			</div>
        )
    }
});
