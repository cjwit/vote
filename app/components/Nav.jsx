import React, { PropTypes, Component } from 'react';
var actions = require('../actions/authActions');

export default class Nav extends Component {
	static propTypes = {
		active: PropTypes.string.isRequired,
		login: PropTypes.object.isRequired
	}

	componentDidMount() {
		actions.getLoginStatus();
	}

	logout = (e) => {
		e.preventDefault();
		actions.logout();
	}

	render() {
		// get login info for navigation
		const loggedIn = this.props.login.status;
		let username = "";
		if (loggedIn) {
			username = this.props.login.user.username;
		}
		const active = this.props.active;

		// build login buttons
		let loginButton = null,
			logoutButton = null,
			userButton = null;

		if (loggedIn) {
			logoutButton = <li className= 'navlink' id = 'logout'><a onClick = { this.logout }>Logout</a></li>
			const userLinkString = "/user/" + username;
			userButton = <li className= { active === 'user' ? 'navlink active' : 'navlink' } id = 'user'><a href="/user">My Polls</a></li>
		} else {
			loginButton = <li className= { active === 'login' ? 'navlink active' : 'navlink' } id = 'login'><a href="/login">Login</a></li>
		}

		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nabvar-collapse" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<span className= { active === 'home' ? 'navlink active' : 'navlink' } id = 'home'><a className="navbar-brand" href="/">Vote!</a></span>
						</div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								{ userButton }
								{ loginButton }
								{ logoutButton }
							</ul>
						</div>
					</div>
				</nav>
			</div>
        )
    }
}
