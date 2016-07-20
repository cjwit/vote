var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var browserHistory = router.browserHistory;
var auth = require('./actions/authActions.js')

// ################
// React Components
var App = require('./components/App.jsx');
var Login = require('./components/Login.jsx');
var Logout = require('./components/Logout.jsx');
var Home = require('./components/Home.jsx');
var User = require('./components/User.jsx');

// #################
// React/Flux Stores
// var authStore = require('./stores/authStore');

// #########################
// Get content from database
/*
var login;
var getAuthStoreCallback = function(_login) {
    login = _login;
	console.log("login from getAuthStoreCallback", login);
    render();
}
*/

// ############################
// functions to manipulate data

// ################
// set up listeners
// authStore.onChange(getAuthStoreCallback);

// #################
// initial rendering
/*
// requireAuth needs login info, which populates within the App itself now
function requireAuth(nextState, replace) {
	var path = window.location.pathname;
	var split = path.split('/')
	var pathUser = split[2]
	console.log("requireAuth", login, pathUser)
	if (login != pathUser) {
		replace({
			pathname: "/login",
			state: { nextPathname: nextState.location.pathname }
		});
	}
}
*/

ReactDOM.render((
	<Router history = { browserHistory }>
		<Route path = "/" component = { App } >
			<IndexRoute component = { Home } />
			<Route path = "/login" component = { Login } />
			<Route path = "/logout" component = { Logout } />
			<Route path = "/user/:username" component = { User }/>
		</Route>
	</Router>
), document.getElementById('app'));

// 			<Route path = "/user/:username" component = { User } onEnter = { requireAuth }/>
