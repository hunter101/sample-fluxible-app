import React from 'react';
import NavLink from './misc/NavLink'

class Home extends React.Component {
    render() {

        var user = this.props.user || {};

        return (

            <div className="container">
                <div className="row">
                    <div className="content">
                        <div style={{background: "url(/assets/images/sample.jpg?dim=1750x300)"}} className="document-title">
                            <h1>Welcome {user.displayName || "Home"}</h1>
                        </div>
                    </div>
                </div>
                <NavLink routeName="editlisting" navParams={{listingId: 1}}>Lilnk</NavLink>
                <NavLink routeName="editlisting" navParams={{listingId: 2}}>Lilnk</NavLink>
                <NavLink routeName="editlisting" navParams={{listingId: 8}}>Lilnk</NavLink>

            </div>
        );
    }
}

export default Home;
