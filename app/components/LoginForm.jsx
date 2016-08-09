import React, { Component, PropTypes } from 'react';
import ErrorMessage from './ErrorMessage.jsx';
var authActions = require('../actions/authActions.js');

export default class LoginForm extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired
	}

	state = {
		username: "",
		password: ""
	}

	componentDidMount() {
		$('#loginSubmit').prop('disabled', true);
		$('#createAccountSubmit').prop('disabled', true);
	}

	openSigninForm() {
		$("#createAccountForm").addClass('hidden');
		$("#signinForm").removeClass('hidden');
	}

	openCreateAccountForm() {
		$("#signinForm").addClass('hidden');
		$("#createAccountForm").removeClass('hidden');
	}

	createAccount = (e) => {
		e.preventDefault();
		const user = this.state;
		authActions.addUser(user);
	}

	login = (e) => {
		e.preventDefault();
		const user = this.state;
		authActions.login(user);
	}

	handleInputChange = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		const state = this.state;
		state[name] = value;
		this.setState(state);

		this.validateForm();
	}

	validateForm() {
		const loginSubmit = $('#loginSubmit'),
			createAccountSubmit = $('#createAccountSubmit'),
			validUsername = this.state.username.length > 0,
			validPassword = this.state.password.length > 0,
			valid = validUsername && validPassword;

		if (valid) {
			loginSubmit.prop('disabled', false);
			createAccountSubmit.prop('disabled', false);
		} else {
			loginSubmit.prop('disabled', true);
			createAccountSubmit.prop('disabled', true);
		}
	}

    render() {
		let err = null;
		if (this.props.login.error !== null) {
			err = <ErrorMessage message = { this.props.login.error } />
		}

		return (
			<div className="container">
		        <div className="row">
					<div className="col-sm-12 text-center">
						<div className="btn-group" role="group" aria-label="...">
							<button type="button" id="signinSelector" className="btn btn-default" onClick={ this.openSigninForm }>Sign In</button>
							<button type="button" id="createAccountSelector" className="btn btn-default" onClick={ this.openCreateAccountForm }>Create Account</button>
						</div>
					</div>
		            <div id="signinForm" className="col-sm-6 col-sm-offset-3 loginForm">
		                <form onSubmit= { this.login } >
		                    <div className="form-group">
		                        <label htmlFor="username">Username:</label>
		                        <input type="text"
									   className="form-control"
									   id="username"
									   name="username"
									   value = { this.state.username }
									   onChange = { this.handleInputChange } />
		                    </div>
							<div className="form-group">
		                        <label htmlFor="password">Password:</label>
								<input type="password"
									   className="form-control"
									   id="password"
									   name="password"
									   value = { this.state.password }
									   onChange = { this.handleInputChange } />
		                    </div>
		                    <button id = "loginSubmit" type="submit" className="btn btn-default">Login</button>
		                </form>
		            </div>
		            <div id="createAccountForm" className="col-sm-6 col-sm-offset-3 hidden loginForm">
		                <form onSubmit = { this.createAccount }>
							<div className="form-group">
		                        <label htmlFor="username">Username:</label>
		                        <input type="text"
									   className="form-control"
									   id="username"
									   name="username"
									   value = { this.state.username }
									   onChange = { this.handleInputChange } />
		                    </div>
							<div className="form-group">
		                        <label htmlFor="password">Password:</label>
								<input type="password"
									   className="form-control"
									   id="password"
									   name="password"
									   value = { this.state.password }
									   onChange = { this.handleInputChange } />
		                    </div>
							<button id = "createAccountSubmit" type="submit" className="btn btn-default">Create Account</button>
		                </form>
		            </div>
		        </div>
				{ err }
		    </div>
        )
    }
}
