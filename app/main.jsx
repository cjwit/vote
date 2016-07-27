var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('./actions/authActions.js')

// ################
// React Components
var Home = require('./components/Home.jsx');
var LoginPage = require('./components/LoginPage.jsx');
var UserPage = require('./components/UserPage.jsx');
var PollPage = require('./components/PollPage.jsx');

// #################
// React/Flux Stores
var authStore = require('./stores/authStore');
var pollStore = require('./stores/pollStore');

// #########################
// Get content from database

var login = {};
var getLoginCallback = function(_login) {
    login = _login;
    render();
}

var polls = [];
var getPollsCallback = function(_polls) {
    polls = _polls;
	console.log("polls from getPollsStoreCallback", polls);
    render();
}

sessionStorage.setItem('voted', JSON.stringify([]));

// ############################
// functions to manipulate data

// ################
// set up listeners
// authStore.onChange(getAuthStoreCallback);

// #################
// initial rendering
function render() {
    var path = window.location.pathname;
    var split = path.split('/')
    var folder = split[1]
    var id = split[2] || null

    if (id === null) {
        switch (folder) {
            case '':
                renderHome();
                break;
            case 'polls':
                renderPolls();
                break;
            case 'login':
                renderLogin();
                break;
			case 'user':
                renderUser();
                break;
            // add default error case
        }
    } else {
        switch (folder) {
            case 'polls':
                renderPollPage(id);
                break;
            // add default error case
        }
    }
}

function renderHome() {
    ReactDOM.render(<Home
		login = { login }
        polls = { polls }
        />, document.getElementById('app'));
}

function renderUser() {
	// filter polls to those owned by the user
    if (login.status === true) {
        ReactDOM.render(<UserPage
            login = { login }
            polls = { polls }
            />, document.getElementById('app'));
    } else {
		console.log("Attempted rendering /user, login = false");
		ReactDOM.render(<UserErrorPage
            login = { login }
            polls = { polls }
            />, document.getElementById('app'));
	}
}

function renderLogin() {
    ReactDOM.render(<LoginPage
        login = { login }
        />, document.getElementById('app'));
}

function renderPollPage(id) {
	// find the correct poll and deliver just that one
    if (polls.length > 0) {
        ReactDOM.render(<PollPage
            login = { login }
			polls = { polls }
            />, document.getElementById('app'));
    }
}

// ################
// set up listeners
authStore.onChange(getLoginCallback);
pollStore.onChange(getPollsCallback);

// #################
// initial rendering
render();
