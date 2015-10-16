import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import RegisterAction from '../actions/register';
var Input = FRC.Input;

class Register extends React.Component {

    constructor(props, context) {
        super(props, context);
        //this.state = {
        //    canSubmit: true
        //    }
        this.context = context;
    }

    submitForm(data) {
        this.context.executeAction(RegisterAction, data);
    }

    enableButton() {
        this.setState({
            canSubmit: true
        });
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <Formsy.Form
                             onSubmit={this.submitForm.bind(this)}
                             ref="form">
                    <Input
                        name="displayName"
                        label="Display Name"
                        type="text"
                        placeholder="Enter a Display Name."
                        validationError="This field is required sucker"
                        required
                        />
                    <Input
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Enter a new username."
                        help="This will be your username."
                        validationError="This field is required sucker"
                        required
                        />
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter a new password."
                        help="This will be your password."
                        validationError="This field is required sucker"
                        required
                        />
                    <button type="submit">Register</button>
                </Formsy.Form>
            </div>
        );
    }
}

Register.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default Register;
