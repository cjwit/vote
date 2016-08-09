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
			loginButton = <p className = 'navbar-text'>{ "Signed in as " + username }</p>
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
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation-collapse" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="/">Vote!</a>
						</div>

						<div className="collapse navbar-collapse" id="navigation-collapse">
							<ul className="nav navbar-nav">
								{ loginButton }
								{ userButton }
								{ logoutButton }
							</ul>
						</div>
					</div>
				</nav>
			</div>
        )
    }
}
