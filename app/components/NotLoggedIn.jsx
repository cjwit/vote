import React, { Component } from 'react';

export default class NotLoggedIn extends Component {
	render() {
		return (
			<div>
				<h1>User page</h1>
				<p><a href = "/login">Login</a> to access user information.</p>
			</div>
        )
    }
}
