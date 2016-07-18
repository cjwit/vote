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
			<div class="container">
		        <div class="row">
		            <div class="col-sm-6">
		                <form action="/login" method="post">
		                    <div class="form-group">
		                        <label for="username-input">Username:</label>
		                        <input type="text" class="form-control" id="username-input" name="username" />
		                    </div>
							<div class="form-group">
		                        <label for="password-input">Password:</label>
		                        <input type="password" class="form-control" id="password-input" name="password" />
		                    </div>
		                    <input type="submit" class="btn btn-default" value="Log In" />
		                </form>
		            </div>
		            <div class="col-sm-6">
		                <form action="/api/user" method="post">
		                    <div class="form-group">
		                        <label for="username-input">Username:</label>
		                        <input type="text" class="form-control" id="username-input" name="username" />
		                    </div>
							<div class="form-group">
		                        <label for="password-input">Password:</label>
		                        <input type="password" class="form-control" id="password-input" name="password" />
		                    </div>
		                    <input type="submit" class="btn btn-default" value="Create a New Account" />
		                </form>
		            </div>
		        </div>
		    </div>
        )
    }
});
