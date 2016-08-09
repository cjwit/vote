import React, { PropTypes, Component } from 'react';
import Poll from './Poll.jsx';
import Footer from './Footer.jsx';
import Nav from './Nav.jsx';
import InputSubmit from './InputSubmit.jsx';
import DeleteButton from './DeleteButton.jsx';
var actions = require('../actions/pollsActions');

export default class PollPage extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired,
		poll: PropTypes.object.isRequired,
		pollNames: PropTypes.array.isRequired
	}

	deletePoll(poll) {
		actions.deletePoll(poll);
		window.location.href = '/';
	}

	render() {
		// get login info for navigation: add edit button if user is the owner
		const poll = this.props.poll,
			pollUrl = window.location.href,
			login = this.props.login,
			username = login.status ? login.user.username : "";

		let editPollInput = null,
			addOptionInput = null,
			deleteButton = null;

		if (username === poll.owner) {
			editPollInput = <InputSubmit poll = { poll } login = { login } submitFunction = { actions.editPoll } name = "editPollButton" placeholder = "Edit" duplicates = { this.props.pollNames } />
			addOptionInput = <InputSubmit poll = { poll } login = { login } submitFunction = { actions.addOption } name = "addOptionButton" placeholder = "Add An Option" duplicates = { poll.options.map(function(o) { return o.name.toLowerCase(); }) } />
			deleteButton = <DeleteButton poll = { poll } deleteFunction = { this.deletePoll } valueToDelete = { poll._id } />
		}

		return (
			<div>
				<Nav active = { "poll" } login = { login } />
				<div className = "container">
					<div className = "row">
						<div className = "col-sm-8 col-sm-offset-2">
							<h1>{ poll.name } { deleteButton }</h1>
							{ editPollInput }
							<p>Share: <a href = { pollUrl }>Link</a></p>
						</div>
						<div className = "text-center">
							<Poll login = { login } poll = { poll } />
						</div>
						<div className = "col-sm-6 col-sm-offset-3 text-center">
						</div>
					</div>
					{ addOptionInput }
				</div>
				<Footer />
			</div>
        )
    }
}
