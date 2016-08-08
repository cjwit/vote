import React, { PropTypes, Component } from 'react';
import Footer from './Footer.jsx';
import LoginForm from './LoginForm.jsx';
import Nav from './Nav.jsx';

export default class LoginPage extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				<Nav active = { "login" } login = { this.props.login } />
				<div className = "container">
					<h1>Login page</h1>
					<LoginForm login = { this.props.login } />
				</div>
				<Footer />
			</div>
        )
    }
}
