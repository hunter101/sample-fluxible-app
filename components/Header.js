import React from 'react';
import Nav from './Nav.js';
import NavLink from './misc/NavLink.js';

var Header = React.createClass({
    render: function () {

        var username = this.props.user.displayName;

        return (
            <header className="header">
                <div className="header-wrapper">
                    <div className="container">
                        <div className="header-inner">
                            <div className="header-logo">
                                <a href="/">
                                    <img src="/assets/img/logo.png" alt="Logo"/>
                                    <span>Superlist</span>
                                </a>
                            </div>

                            <div className="header-content">
                                <div className="header-bottom">
                                    <Nav selected={this.props.pageTitle} links={this.props.links}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
});
module.exports = Header;
