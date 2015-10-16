import React from 'react';
import NavLink from './NavLink';
import userRoutes from '../config/routes';
import userRoles from '../config/roles';

class Nav extends React.Component {

    render() {
        const selected = this.props.selected;
        const links = this.props.links;
        const user = this.context.getStore('ApplicationStore').user;

        const linkHTML = Object.keys(links).map((name) => {
            var className = '';
            var link = links[name];

            if (selected === name) {
                className = 'pure-menu-selected';
            }

            if (link.auth && link.showLinkNonAuth === false) {
                if (!userRoles.canAccess(user.role, link.auth)) {
                    return;
                }
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
                </li>
            );
        });

        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                {linkHTML}
            </ul>
        );
    }
}

Nav.defaultProps = {
    selected: 'home',
    links: {}
};

Nav.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default Nav;
