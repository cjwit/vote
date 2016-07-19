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
			loggedIn: false
		}
	},

	componentDidMount() {
		var loginStatus = auth.loggedIn()
		console.log("App mounted, loginStatus is", loginStatus); // perhaps this needs to be a callback?
		this.setState({
			loggedIn: loginStatus
		});
	},

	render: function() {
		console.log("rendering App, login:", this.state.loggedIn); // reading as undefined after running update
		return (
			<div>
				<Nav loggedIn = { this.state.loggedIn } />
				<div className="container">App login status is: {this.state.loggedIn ? "Logged in" : "Not logged in"}</div>
				{ this.props.children }
				<Footer />
			</div>
        )
    }
});
