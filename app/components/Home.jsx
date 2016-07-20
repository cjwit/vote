var React = require('react');
var auth = require('../actions/authActions.js')

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    render: function() {
		var loggedIn = this.props.login.loggedIn;
		return (
			<div>
				<div className="container">
					<div className="header">
						<h1>Vote!</h1>
						<h2>Easily create, share, and vote in polls</h2>

						{ loggedIn ? 
							<p>Logged in as { this.props.login.username }</p>
							:
							<p>Not logged in</p>
						}

						<p><a className="btn btn-primary btn-lg" href="#" role="button" disabled={ loggedIn ? "true" : "false" } >Create a new poll</a></p>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-4 col-sm-offset-2">
							Hello World!
						</div>
						<div className="col-sm-4">
							<h2>Recent Polls</h2>
							<div className="mini-poll">
								<div className="mini-results"></div>
								<div className="mini-option"><p>Option 1</p></div>
								<div className="mini-option"><p>Option 2</p></div>
								<div className="mini-option"><p>Option 3</p></div>
							</div>
							<div className="mini-poll">
								<div className="mini-results"></div>
								<div className="mini-option"><p>Option 1</p></div>
								<div className="mini-option"><p>Option 2</p></div>
								<div className="mini-option"><p>Option 3</p></div>
							</div>
							<div className="mini-poll">
								<div className="mini-results"></div>
								<div className="mini-option"><p>Option 1</p></div>
								<div className="mini-option"><p>Option 2</p></div>
								<div className="mini-option"><p>Option 3</p></div>
							</div>
							<div className="mini-poll">
								<div className="mini-results"></div>
								<div className="mini-option"><p>Option 1</p></div>
								<div className="mini-option"><p>Option 2</p></div>
								<div className="mini-option"><p>Option 3</p></div>
							</div>
							<div className="mini-poll">
								<div className="mini-results"></div>
								<div className="mini-option"><p>Option 1</p></div>
								<div className="mini-option"><p>Option 2</p></div>
								<div className="mini-option"><p>Option 3</p></div>
							</div>
						</div>
					</div>
	            </div>
			</div>
        )
    }
});
