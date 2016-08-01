var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            value: ""
        };
    },

    componentDidMount: function () {
		$('#' + this.props.name).prop('disabled', true);
    },

	resetForm: function() {
		this.setState({ value: "" });
		$('#' + this.props.name).prop('disabled', true);
	},

    submitValue: function(e) {
        e.preventDefault();
        var info = this.state,
			submitFunction = this.props.submitFunction;

		info.id = this.props.poll._id;
        submitFunction(info);
		this.resetForm();
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
        this.validateForm();
    },

    validateForm: function() {
		// check for errorMessage
		var valueIsUnique = true;
		if (this.props.duplicates.indexOf(this.state.value.trim().toLowerCase()) !== -1) {
			$("#error_" + this.props.name).removeClass("hidden").text("Value must be unique.");
			valueIsUnique = false;
		} else {
			$("#error_" + this.props.name).addClass("hidden").text("");
		}

		// set submit button
        var submit = $('#' + this.props.name),
            value = this.state.value.length > 0,
			// login = this.props.login.status,
			// valid = login && option, ADD THIS BACK IN TO CHECK LOGIN AGAINST POLL OWNER
			valid = value && valueIsUnique;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    render: function() {
		var onClick = this.submitValue;
		var errorDivId = "error_" + this.props.name;

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
});
