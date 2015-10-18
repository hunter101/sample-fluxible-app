import React from 'react';
import NavLink from './misc/NavLink';
import userRoutes from '../config/routes';
import userRoles from '../config/roles';

class Nav extends React.Component {

    render() {

        var pictureStyleLi = {
            padding: "10px"
        };

        var pictureStyle = {
            borderRadius: "50%",
            height: "40px",
            marginLeft: "10px"
        };

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

            if (link.menu !== "main") {
                return;
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
                </li>
            );
        });

        return (
            <ul className="header-nav-primary nav nav-pills collapse navbar-collapse">
                {linkHTML}
                {user.displayName && (
                    <li><NavLink style={pictureStyleLi} routeName="userprofile" navParams={{profileId: user.id}}>
                            {user.displayName}
                            <img style={pictureStyle} src={"http://graph.facebook.com/" + user.facebookId + "/picture"} />
                        </NavLink>
                    </li>
                )}


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
