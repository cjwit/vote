import React, { Component, PropTypes } from 'react';

export default class DeleteButton extends Component {
	static propTypes = {
		poll: PropTypes.object.isRequired,
		deleteFunction: PropTypes.func.isRequired,
		valueToDelete: PropTypes.string.isRequired
	}

	deleteFunction = (e) => {
		e.preventDefault();
		const toDelete = { id: this.props.poll._id, value: e.target.id }
		const deleteFunction = this.props.deleteFunction;
		deleteFunction(toDelete);
	}

    render() {
		const onClick = this.deleteFunction;

        return (
                <button id = { this.props.valueToDelete }
						className = "btn btn-danger btn-sm delete-button"
						onClick = { onClick } >&#10006;</button>
        )
    }
}
