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
					<h1 className = "text-center">Login</h1>
					Currently broken, fixing.
					<LoginForm login = { this.props.login } />
					Note: the goal of this project is to create easily accessible small polls that do not require a user to log in before voting. For that reason, all polls are shared publicly, though control over deleting options or polls remains exclusively with the user who creates them.
				</div>
				<Footer />
			</div>
        )
    }
}
