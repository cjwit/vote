import React, { PropTypes, Component } from 'react';
import Footer from './Footer.jsx';
import LoginForm from './LoginForm.jsx';
import Nav from './Nav.jsx';

export default class LoginPage extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired
	}

	render() {
		let err;
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
}
