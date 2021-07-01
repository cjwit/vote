import React, { Component, PropTypes } from 'react';
var actions = require('../actions/pollsActions');

export default class CreatePollForm extends Component {
	static propTypes = {
		login: PropTypes.object.isRequired,
		pollNames: PropTypes.array.isRequired
	}

	state = {
		name: "",
		options: "",
		date: null
	}

	componentDidMount() {
		// validation setup
		const submit = $('#submit');
		submit.prop('disabled', true)
	}

	resetForm = () => {
		this.setState({
			name: "",
			options: "",
			date: null
		});
		$(".form-group").removeClass("has-error has-success");
		$('#submit').prop('disabled', true);
	}

	addPoll = (e) => {
        e.preventDefault();
        const info = this.state;
        const now = new Date(Date.now());
        info.date = now;
		let options = [];
		info.options.split(',').forEach((o) => {
			const option = {
				name: o.trim(),
				votes: 0
			}
			options.push(option);
		});
		info.options = options;
		// info.owner = this.props.login.user.username; // FIXME uncomment after fixing auth
		info.owner = "Test User (change after fixing auth)";
    actions.addPoll(info);
		this.resetForm();
    }

	handleInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name,
			value = e.target.value,
			state = this.state;

		state[name] = value;
        this.setState(state);

        // validate element to set class
        const element = $("#" + name);
     	let condition = false,
			toValidate = false;

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
    }

	validateForm() {
		// check for errorMessage
		let nameIsUnique = true;
		if (this.props.pollNames.indexOf(this.state.name.trim().toLowerCase()) !== -1) {
			$("#errorMessage").removeClass("hidden").text("Your poll's name must be unique.");
			nameIsUnique = false;
		} else {
			$("#errorMessage").addClass("hidden").text("");
		}

		// set submit button
		const submit = $('#submit'),
			name = this.state.name.length > 0,
			options = this.state.options.length > 0,
			// valid = name && options && nameIsUnique && this.props.login.status; // uncomment after fixing auth
			valid = name && options && nameIsUnique;
		if (valid) {
			submit.prop('disabled', false);
		} else {
			submit.prop('disabled', true);
		}
	}

	render() {
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

                <button id = "submit" type="submit" className="btn btn-default">
					{ this.props.login.status ? "Submit" : "Login to create a poll" }
				</button>
            </form>
        )
    }
}
