var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

// ################
// React Components
var App = require('./components/App.jsx');

// #################
// React/Flux Stores
var store = require('./stores/store');

// #########################
// Get content from database
var things = [];
var getStoreCallback = function(_things) {
    things = _things;
    render();
}

// ############################
// functions to manipulate data

// ################
// set up listeners
store.onChange(getStoreCallback);

// #################
// initial rendering
ReactDOM.render((
	<Router history = { hashHistory }>
		<Route path = "/" component = { App } />
	</Router>
), document.getElementById('app'));
