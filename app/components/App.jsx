var React = require('react');
var Nav = require('./Nav.jsx');
var Footer = require('./Footer.jsx');
var auth = require('../actions/authActions.js')

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
	getInitialState() {
		return {
			loggedIn: auth.loggedIn()
		}
	},

	updateAuth(loggedIn) {
		this.setState({
			loggedIn
		})
	},

	componentWillMount() {
		auth.onChange = this.updateAuth
		auth.login()
	},

	render: function() {
		return (
			<div>
				<Nav loggedIn = { this.state.loggedIn } />
				<p>Login status is: {this.state.loggedIn ? "Logged in" : "Not logged in"}</p>
				{ this.props.children }
				<Footer />
			</div>
        )
    }
});
