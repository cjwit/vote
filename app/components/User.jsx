var React = require('react');
var auth = require('../actions/authActions.js')

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    render: function() {
		var token = auth.getToken();
		return (
			<div className = "container">
				<h2>Username: { this.props.params.username }</h2>
				<p>Token: { token }</p>
			</div>
		)
    }
});
