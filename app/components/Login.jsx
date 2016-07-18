var React = require('react');

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    render: function() {
		return (
			<div className="container">
		        <div className="row">
		            <div className="col-sm-4 col-sm-offset-2">
		                <form action="/login" method="post">
		                    <div className="form-group">
		                        <label htmlFor="username-input">Username:</label>
		                        <input type="text" className="form-control" id="username-input" name="username" />
		                    </div>
							<div className="form-group">
		                        <label htmlFor="password-input">Password:</label>
		                        <input type="password" className="form-control" id="password-input" name="password" />
		                    </div>
		                    <input type="submit" className="btn btn-default" value="Log In" />
		                </form>
		            </div>
		            <div className="col-sm-4">
		                <form action="/api/user" method="post">
		                    <div className="form-group">
		                        <label htmlFor="username-input">Username:</label>
		                        <input type="text" className="form-control" id="username-input" name="username" />
		                    </div>
							<div className="form-group">
		                        <label htmlFor="password-input">Password:</label>
		                        <input type="password" className="form-control" id="password-input" name="password" />
		                    </div>
		                    <input type="submit" className="btn btn-default" value="Create a New Account" />
		                </form>
		            </div>
		        </div>
		    </div>
        )
    }
});
