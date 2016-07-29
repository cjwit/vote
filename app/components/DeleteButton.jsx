var React = require('react');

module.exports = React.createClass({
	deleteFunction: function(e) {
		e.preventDefault();
		var toDelete = { id: this.props.poll._id, value: e.target.id }
		var deleteFunction = this.props.deleteFunction;
		deleteFunction(toDelete);
	},

    render: function() {
		var onClick = this.deleteFunction;

        return (
                <button id = { this.props.valueToDelete }
						className = "btn btn-danger btn-sm delete-button"
						onClick = { onClick } >&#10006;</button>
        )
    }
});
