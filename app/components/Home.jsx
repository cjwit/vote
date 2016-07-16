var React = require('react');

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
//            login: this.props.login
        }
    },

    render: function() {
		return (
			<div>
				<div className="jumbotron">
					<div className="container">
						<h1>Vote!</h1>
						<p>Easily create, share, and vote in polls</p>
						<p><a className="btn btn-primary btn-lg" href="#" role="button">Login to get started</a></p>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-8">
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
