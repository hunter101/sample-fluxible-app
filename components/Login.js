import React from 'react';

class Login extends React.Component {

    render() {

        var query = this.props.query;

        return (
            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-4">
                            <div className="page-title">
                                <h1>Login</h1>
                            </div>

                            <form method="POST" action="/login">
                                <div className="form-group">
                                    <label htmlFor="login-form-email">E-mail</label>
                                    <input placeholder="username" className="form-control" name="username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login-form-email">E-mail</label>
                                    <input placeholder="password" className="form-control" name="password"/>
                                </div>
                                <a href="/auth/facebook">Login with facebook</a>
                                <button className="btn btn-primary pull-right" type="submit">Submit</button>
                                {query.invalid &&
                                (<div className="message">Incorrect username or password</div>)
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default Login;
