import React from 'react';
import getMessages from '../actions/test';

// register the service

class Test extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.store = context.getStore('ApplicationStore');
    }

    onClick(e) {
        this.context.executeAction(getMessages, {});
    }

    showMessageDetails(id) {
        this.context.executeAction(getMessages, {id: id});
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-lg-9">
                        <div className="content">
                            <div className="page-title">
                                <h1>This is a test title</h1>
                            </div>

                            <p>This is the test page woop</p>
                            <button onClick={this.onClick.bind(this)}>Click me</button>
                            {this.store.messages.map(
                                (message) => {
                                    return (<div key={message.id} onClick={this.showMessageDetails.bind(this, message.id)}>
                                        Message: {message.threadName}</div>)
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Test.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
}

export default Test;
