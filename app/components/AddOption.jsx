var React = require('react');
var actions = require('../actions/pollsActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            option: ""
        };
    },

    componentDidMount: function () {
		$('#addOptionButton').prop('disabled', true);
    },

	resetForm: function() {
		this.setState({ option: "" });
		$('#addOptionButton').prop('disabled', true);
	},

    addOption: function(e) {
        e.preventDefault();
        var info = this.state;
		info.id = this.props.poll._id;
        actions.addOption(info);
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
        var submit = $('#addOptionButton'),
            option = this.state.option.length > 0,
			// login = this.props.login.status,
			// valid = login && option, ADD THIS BACK IN TO CHECK LOGIN AGAINST POLL OWNER
			valid = option;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    render: function() {
		var addOption = this.addOption;

        return (
                <div className="input-group">
                    <input type="text" className="form-control"
                           id="option"
                           name = "option"
                           placeholder="Add a New Option"
                           value = { this.state.option }
                           onChange = { this.handleInputChange } />
					   <span className = "input-group-btn">
						   <button id = "addOptionButton" className = "btn btn-default" onClick = { addOption } type = "button">Add option</button>
					   </span>
                </div>
        )
    }
});
