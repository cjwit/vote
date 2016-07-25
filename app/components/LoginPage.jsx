var React = require('react');
var Footer = require('./Footer.jsx');
var LoginForm = require('./LoginForm.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
	render: function() {
		console.log(this.props.login)
		var err;
		if (this.props.login.error) {
			console.log(this.props.login.error);
			err = <div className="col-sm-12 text-center"><div className="alert alert-danger">{ this.props.login.error }</div></div>
		}

		return (
			<div>
				<Nav active = { "login" } login = { this.props.login } />
				<div className = "container">
					<h1>Login page</h1>
					<LoginForm />
					{ err }
				</div>
				<Footer />
			</div>
        )
    }
});
