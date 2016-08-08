import React, { PropTypes, Component } from 'react';
import PollDisplay from './PollDisplay.jsx';

export default class UserInfo extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired,
		polls: PropTypes.array.isRequired
	}

	state = {
		creating: false,
		pollSorting: 'dateRecent'
	}

	componentDidMount() {
		$("#newPollButton").click(() => {
			this.setState({ creating: !this.state.creating });
		});
	}

	render() {
		const username = this.props.login.user.username;
		return (
			<div>
				<div className = "row text-center">
					<h1>{ username }</h1>
					<h2>View and edit your polls</h2>
					<p><span id = "newPollButton" className="btn btn-primary btn-lg" role="button">{ this.state.creating ? 'Close Form' : 'Create a new poll' }</span></p>
				</div>
				<PollDisplay creating = { this.state.creating } login = { this.props.login } polls = { this.props.polls } />
			</div>
        )
    }
}
