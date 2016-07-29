var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            value: ""
        };
    },

    componentDidMount: function () {
		$('#submitButton').prop('disabled', true);
    },

	resetForm: function() {
		this.setState({ option: "" });
		$('#submitButton').prop('disabled', true);
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
        // set submit button
        var submit = $('#submitButton'),
            value = this.state.value.length > 0,
			// login = this.props.login.status,
			// valid = login && option, ADD THIS BACK IN TO CHECK LOGIN AGAINST POLL OWNER
			valid = value;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    render: function() {
		var onClick = this.submitValue;

        return (
                <div className = "form-group">
					<div className="input-group">
	                    <input type="text" className="form-control"
	                           id="value"
	                           name = "value"
	                           placeholder= { this.props.placeholder }
	                           value = { this.state.value }
	                           onChange = { this.handleInputChange } />
						   <span className = "input-group-btn">
							   <button id = "submitButton" className = "btn btn-default" onClick = { onClick } type = "button">Submit</button>
						   </span>
	                </div>
                </div>
        )
    }
});
