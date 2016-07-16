var React = require('react');
var ReactDOM = require('react-dom');

// ################
// React Components

var Home = require('./components/Home.jsx');

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

function dateEvents() {
    events.map(function(event) {
        event.date = new Date(event.date);
    })
}

// ################
// render functions
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
        }
    }
}

function renderHome() {
    ReactDOM.render(<Home
        thing = { things }
        />, document.getElementById('container'));
}

// ################
// set up listeners
store.onChange(getStoreCallback);

// #################
// initial rendering
render();
