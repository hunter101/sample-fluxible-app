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
            <div>
                <h2>This ist he totel</h2>
                <p>This is the test page woop</p>
                <button onClick={this.onClick.bind(this)}>Click me</button>
                {this.store.messages.map(
                    (message) => {
                        return (<div onClick={this.showMessageDetails.bind(this, message.id)} >Message: {message.threadName}</div>)
                    }
                )}
            </div>
        );
    }
}

Test.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
}

export default Test;
