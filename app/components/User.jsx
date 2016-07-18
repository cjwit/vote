var React = require('react');

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    render: function() {
		return (

			<div className = "container">
				<h2>{ this.props.params.username }</h2>
			</div>
		)
    }
});
