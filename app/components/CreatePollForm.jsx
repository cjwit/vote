var React = require('react');
var actions = require('../actions/pollsActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            options: "",
            date: null
        };
    },

    componentDidMount: function () {
        // validation setup
        var submit = $('#submit');
        submit.prop('disabled', true)
    },

	resetForm: function() {
		this.setState({
			name: "",
			options: "",
			date: null
		});
		$(".form-group").removeClass("has-error has-success");
		$('#submit').prop('disabled', true);
	},

    addPoll: function(e) {
        e.preventDefault();
        var info = this.state;
        var now = new Date(Date.now());
        info.date = now;
		var options = [];
		info.options.split(',').forEach(function(o) {
			var option = {
				name: o.trim(),
				votes: 0
			}
			options.push(option);
		});
		info.options = options;
        actions.addPoll(info);
		this.resetForm();
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);

        // validate element to set class
        var element = $("#" + name);
        var condition = false;
        var toValidate = false;

        switch (name) {
            case "name":
                condition = value.length > 0;
                toValidate = true;
                break;
            case "options":
                condition = value.length > 0;
                toValidate = true;
                break;
            default:
                break;
        }

        if (toValidate) {
            if (condition) {
                element.parent().removeClass('has-error').addClass('has-success')
            } else {
                element.parent().removeClass('has-success').addClass('has-error')
            }
        }
        this.validateForm();
    },

    validateForm: function() {
		// check for errorMessage
		var nameIsUnique = true;
		if (this.props.pollNames.indexOf(this.state.name.trim().toLowerCase()) !== -1) {
			$("#errorMessage").removeClass("hidden").text("Your poll's name must be unique.");
			nameIsUnique = false;
		} else {
			$("#errorMessage").addClass("hidden").text("");
		}

        // set submit button
        var submit = $('#submit'),
            name = this.state.name.length > 0,
            options = this.state.options.length > 0,
            valid = name && options && nameIsUnique;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    render: function() {
        return (
            <form onSubmit = { this.addPoll } id = "addPollForm">
				<h2>Create a Poll</h2>

				<div id = "errorMessage" className = "alert alert-danger hidden" />

				<div className="form-group">
                    <label className = 'control-label' htmlFor="title">New Poll Name</label>
                    <input type="text" className="form-control"
                           id="name"
                           name = 'name'
                           placeholder="Poll Name"
                           value = { this.state.name }
                           onChange = { this.handleInputChange } />
                </div>

                <div className="form-group">
                    <label className = 'control-label' htmlFor="author">Options</label>
                    <input type="text" className="form-control"
                           id="options"
                           name = 'options'
                           placeholder="Options"
                           value = { this.state.options }
						   onChange = { this.handleInputChange } />
					<p className="help-block">Separate options with a comma.</p>
                </div>

                <button id = "submit" type="submit" className="btn btn-default">Submit</button>
            </form>
        )
    }
});
