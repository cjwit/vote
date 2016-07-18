var React = require('react');
var router = require('react-router');
var Link = router.Link;
var IndexLink = router.IndexLink;

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    render: function() {
		return (
			<nav className="navbar navbar-default">
		        <div className="container-fluid">
		            <div className="navbar-header">
		                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nabvar-collapse" aria-expanded="false">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                </button>
						<IndexLink className="navbar-brand" to="/" activeClassName="active">Vote!</IndexLink>
		            </div>

		            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		                <ul className="nav navbar-nav">
		                    <li><Link to="/user" activeClassName="active">My Polls</Link></li>
							<li><Link to="/login" activeClassName="active">{ this.props.loggedIn ? "Logout" : "Log In"}</Link></li>
		                </ul>
		            </div>
		        </div>
		    </nav>
        )
    }
});
