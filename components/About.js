import React from 'react';
import NavLink from './NavLink';
//import { NavLink } from "fluxible-router";

class About extends React.Component {
    render() {

        return (
            <div>
                <h2>About</h2>

                <p>This is a description of the site.</p>
                <NavLink routeName="test">Login</NavLink>
            </div>
        );
    }
}

About.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default About;
