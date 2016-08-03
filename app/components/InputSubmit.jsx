import React, { PropTypes, Component } from 'react';

export default class InputSubmit extends Component {
	static propTypes = {
		poll: PropTypes.object.isRequired,
		login: PropTypes.object.isRequired,
		submitFunction: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		duplicates: PropTypes.array.isRequired
	}

	state = {
        value: ""
    }

    componentDidMount() {
		$('#' + this.props.name).prop('disabled', true);
    }

	resetForm() {
		this.setState({ value: "" });
		$('#' + this.props.name).prop('disabled', true);
	}

    submitValue = (e) => {
        e.preventDefault();
        const info = this.state,
			submitFunction = this.props.submitFunction;

		info.id = this.props.poll._id;
        submitFunction(info);
		this.resetForm();
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        const state = this.state;
        state[name] = value;
        this.setState(state);
        this.validateForm();
    }

    validateForm() {
		// check for errorMessage
		let valueIsUnique = true;
		if (this.props.duplicates.indexOf(this.state.value.trim().toLowerCase()) !== -1) {
			$("#error_" + this.props.name).removeClass("hidden").text("Value must be unique.");
			valueIsUnique = false;
		} else {
			$("#error_" + this.props.name).addClass("hidden").text("");
		}

		// set submit button
        const submit = $('#' + this.props.name),
            value = this.state.value.length > 0,
			// login = this.props.login.status,
			// valid = login && option, ADD THIS BACK IN TO CHECK LOGIN AGAINST POLL OWNER
			valid = value && valueIsUnique;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    }

    render() {
		const onClick = this.submitValue;
		const errorDivId = "error_" + this.props.name;

        return (
			<div>
                <div className = "form-group">
					<div className="input-group">
	                    <input type="text" className="form-control"
	                           id="value"
	                           name = "value"
	                           placeholder= { this.props.placeholder }
	                           value = { this.state.value }
	                           onChange = { this.handleInputChange } />
						   <span className = "input-group-btn">
							   <button id = { this.props.name } className = "btn btn-default" onClick = { onClick } type = "button">Submit</button>
						   </span>
	                </div>
                </div>
				<div id = { errorDivId } className="alert alert-danger hidden" />
			</div>
        )
    }
}
