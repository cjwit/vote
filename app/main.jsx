var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('./actions/authActions.js')

// ################
// React Components
var Home = require('./components/Home.jsx');
var LoginPage = require('./components/Login.jsx');
var UserPage = require('./components/User.jsx');
var PollPage = require('./components/User.jsx');

// #################
// React/Flux Stores
var authStore = require('./stores/authStore');
var pollStore = require('./stores/authStore');

// #########################
// Get content from database

var login = { status: false, user: null }
var getUserCallback = function(_login) {
    login = _login;
	console.log("login from getAuthStoreCallback", login);
    render();
}

var polls;
var getPollsCallback = function(_polls) {
    polls = _polls;
	console.log("polls from getPollsStoreCallback", polls);
    render();
}


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
        />, document.getElementById('container'));
}

function renderUser() {
    if (login.status === true) {
        ReactDOM.render(<UserPage
            login = { login }
            polls = { polls }
            />, document.getElementById('container'));
    } else {
		console.log("Trying to render user, but login = false")
		renderHome();
	}
}

function renderLogin() {
    ReactDOM.render(<LoginPage
        login = { login }
        />, document.getElementById('container'));
}

function renderPolls() {
    if (polls.length > 0) {
        ReactDOM.render(<PollsOverview
            login = { login }
			polls = { polls }
            />, document.getElementById('container'));
    }
}

function renderPollPage(id) {
    if (polls.length > 0) {
        ReactDOM.render(<PollPage
            login = { login }
			polls = { polls }
            />, document.getElementById('container'));
    }
}

// ################
// set up listeners
loginStore.onChange(getUserCallback);
pollStore.onChange(getPollsCallback);

// #################
// initial rendering
render();
