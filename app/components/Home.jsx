import React, { PropTypes, Component } from 'react';
import PollDisplay from './PollDisplay.jsx';
import Footer from './Footer.jsx';
import Nav from './Nav.jsx';

export default class Home extends Component {
	static propTypes = {
		polls: PropTypes.array.isRequired,
		login: PropTypes.object.isRequired
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
		// get login info for navigation
		const username = this.props.login.status ? this.props.login.user.username : "";

		return (
			<div>
				<Nav active = { "home" } login = { this.props.login } />
				<div className = "container">
					<div className = "row text-center">
						<h1>Vote!</h1>
						<h2>Easily create, share, and vote in polls</h2>

						{ this.props.login.status ?
							<p>Logged in as { username }</p>
							:
							<p>Not logged in</p>
						}

						<p><span id = "newPollButton" className="btn btn-primary btn-lg" role="button">{ this.state.creating ? 'Close Form' : 'Create a new poll' }</span></p>
					</div>
					<PollDisplay creating = { this.state.creating } login = { this.props.login } polls = { this.props.polls } />
				</div>

				<Footer />
			</div>
        )
    }
}
