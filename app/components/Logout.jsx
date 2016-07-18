var React = require('react');
var router = require('react-router');
var auth = require('../actions/authActions.js')
var browserHistory = router.browserHistory;
var Link = router.Link;

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    componentDidMount() {
		auth.logout(function() {
			browserHistory.push('/');
		});
	},

	render: function() {
		return (

			<div className = "container">
				<h2>You are now logged out.</h2>
				<Link to="/">Back to Home</Link>
			</div>
		)
    }
});
