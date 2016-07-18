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
			<nav class="navbar navbar-default">
		        <div class="container-fluid">
		            <div class="navbar-header">
		                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nabvar-collapse" aria-expanded="false">
		                    <span class="sr-only">Toggle navigation</span>
		                    <span class="icon-bar"></span>
		                    <span class="icon-bar"></span>
		                    <span class="icon-bar"></span>
		                </button>
						<a class="navbar-brand" href="../">Vote!</a>
		            </div>

		            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		                <ul class="nav navbar-nav">
		                    <li><a href="../user">My Polls</a></li>
							<li><a href="../login">Login/Logout</a></li>
		                </ul>
		            </div>
		        </div>
		    </nav>
        )
    }
});
