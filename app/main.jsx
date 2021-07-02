import './style.sass';
import React from 'react';
var ReactDOM = require('react-dom');
var auth = require('./actions/authActions.js')

// ################
// React Components
import Home from './components/Home.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserPage from './components/UserPage.jsx';
import PollPage from './components/PollPage.jsx';

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
    render();
}

if (sessionStorage.getItem("voted") === null) {
	sessionStorage.setItem('voted', JSON.stringify([]));
}

// ############################
// functions to manipulate data
function getPollById(id) {
	var poll = polls.find(function(poll) {
		return poll._id === id;
	})
	if (poll === undefined) {
		poll = {
			name: "",
			owner: "",
			date: null,
			_id: id,
			options: []
		};
	}
	return poll;
}

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
	var userPolls = [];
	if (login.status) {
		polls.forEach(function(p) {
			if (p.owner === login.user.username) {
				userPolls.push(p);
			}
		});
	}
    ReactDOM.render(<UserPage
        login = { login }
        polls = { userPolls }
        />, document.getElementById('app'));
}

function renderLogin() {
    ReactDOM.render(<LoginPage
        login = { login }
        />, document.getElementById('app'));
}

function renderPollPage(id) {
	var poll = getPollById(id);
    ReactDOM.render(<PollPage
        login = { login }
		poll = { poll }
		pollNames = { polls.map(function(p) { return p.name.toLowerCase(); }) }
        />, document.getElementById('app'));
}

// ################
// set up listeners
// authStore.onChange(getLoginCallback);
pollStore.onChange(getPollsCallback);

// #################
// initial rendering
render();
