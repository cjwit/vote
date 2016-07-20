var React = require('react');

module.exports = React.createClass({
    render: function() {
		return (
			<div className = "container">
				<h2>Username: { this.props.params.username }</h2>
			</div>
		)
    }
});
