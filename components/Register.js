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
            <div  className="container">
                <div  className="content">

                    <div  className="row">
                        <div  className="col-sm-4 col-sm-offset-4">
                            <div  className="page-title">
                                <h1>Register</h1>
                            </div>

                            <Formsy.Form
                                onSubmit={this.submitForm.bind(this)}
                                ref="form">

                                <div  className="form-group">
                                    <Input
                                        name="displayName"
                                        layout="vertical"
                                        label="Display Name"
                                        id="displayname"
                                        type="text"
                                        placeholder="Enter a Display Name."
                                        validationError="This field is required sucker"
                                        required
                                        />
                                </div>

                                <div className="form-group">

                                    <Input
                                        name="username"
                                        layout="vertical"
                                        label="Username"
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter a new username."
                                        validationError="This field is required sucker"
                                        required
                                        />
                                </div>


                                <div  className="form-group">
                                    <Input
                                        name="password"
                                        layout="vertical"
                                        label="Password"
                                        id="password"
                                        type="password"
                                        placeholder="Enter a new password."
                                        validationError="This field is required sucker"
                                        required
                                        />
                                </div>

                                <button type="submit"  className="btn btn-primary pull-right">Register</button>
                            </Formsy.Form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

Register.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default Register;
