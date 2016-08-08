import React, { PropTypes, Component } from 'react';
import Footer from './Footer.jsx';
import UserInfo from './UserInfo.jsx';
import NotLoggedIn from './NotLoggedIn.jsx';
import Nav from './Nav.jsx';

export default class UserPage extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired,
		polls: PropTypes.array.isRequired
	}

	render() {
		return (
			<div>
				<Nav active = { "user" } login = { this.props.login } />
				<div className = "container">
					{ this.props.login.status ?
						<UserInfo login = { this.props.login } polls = { this.props.polls } />
						:
						<NotLoggedIn />
					}
				</div>
				<Footer />
			</div>
        )
    }
}
