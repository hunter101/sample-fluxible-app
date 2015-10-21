import React from 'react';
import NavLink from './misc/NavLink'

class Home extends React.Component {
    render() {

        var user = this.props.user || {};

        return (

            <div className="container">
                <div className="content">
                    <div className="row">

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
