var React = require('react');
var Nav = require('./Nav.jsx');
var Footer = require('./Footer.jsx');

// ##########
// Components

// var Thing = require('./Thing.jsx');

module.exports = React.createClass({
    render: function() {
		return (
			<div>
				<Nav />
				{ this.props.children }
				<Footer />
			</div>
        )
    }
});
