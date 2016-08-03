import React from 'react';
import Footer from './Footer.jsx';
var UserInfo = require('./UserInfo.jsx');
import NotLoggedIn from './NotLoggedIn.jsx';
import Nav from './Nav.jsx';

module.exports = React.createClass({
	render: function() {
		console.log("rendering userPage", this.props.login.status)
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
});
