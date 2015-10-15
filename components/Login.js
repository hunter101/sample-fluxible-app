import React from 'react';

class Login extends React.Component {

    render() {

        var query = this.props.query;

        return (
            <div>
                <h2>Login</h2>

                <form method="POST" action="/login">
                    <input placeholder="username" className="username" name="username"/>
                    <input placeholder="password" className="password" name="password"/>
                    <button className="submit" type="submit">Submit</button>
                    {query.invalid &&
                    (<div className="message">Incorrect username or password</div>)
                    }
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
