import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <a href="/auth/facebook">Login with facebook</a>
                <form method="POST" action="/login">
                    <input placeholder="username" name="username" />
                    <input placeholder="password" name="password" />
                    <button onClick={this.handleSubmit} type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

Login.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default Login;

//
//import React from 'react';
//import LoginAction from '../actions/login';
//
//class Login extends React.Component {
//
//    handleSubmit() {
//        this.context.executeAction(LoginAction, {
//            username: this.refs.username.getDOMNode().value,
//            password: this.refs.password.getDOMNode().value
//        });
//    }
//
//
//    render() {
//        return (
//            <div>
//                <h2>Login</h2>
//                <input ref="username" placeholder="username" name="username" />
//                <input ref="password" ref="password" placeholder="password" name="password" />
//                <button onClick={this.handleSubmit.bind(this)} type="submit">Submit</button>
//            </div>
//        );
//    }
//}
//
//Login.contextTypes = {
//    executeAction: React.PropTypes.func.isRequired,
//    getStore: React.PropTypes.func.isRequired
//};
//
//export default Login;
