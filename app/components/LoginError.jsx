var React = require('react');

module.exports = React.createClass({
    render: function() {
		return (
			<div className="col-sm-4 col-sm-offset-4 text-center">
				<div className="alert alert-danger">There was a problem with your login. Try again.</div>
			</div>
		)
    }
});
