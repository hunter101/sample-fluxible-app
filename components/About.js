import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div>
                <h2>About</h2>
                <p>This is a description of the site.</p>
            </div>
        );
    }
}

About.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
}

export default About;
