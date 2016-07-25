var React = require('react');
var Footer = require('./Footer.jsx');
var LoginForm = require('./LoginForm.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<Nav active = { "login" } login = { this.props.login } />
				<div className = "container">
					<h1>Login page</h1>
					<LoginForm />
				</div>
				<Footer />
			</div>
        )
    }
});
