import React from 'react';
import NavLink from '../misc/NavLink';
import _ from 'underscore';

class UserProfileComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.store = this.context.getStore('UserProfileStore');
    }

    render() {

        var profile = this.store.profile;
        console.log(profile);

        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-8 col-lg-9">
                        <div className="content">
                            <div className="page-title">
                                <h1>My Profile: {profile.displayName}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-lg-3">
                        <div className="sidebar">
                            <div className="widget">
                                <h2 className="widgettitle">My Listings</h2>

                                {profile.Listings.map( (listing) => {

                                    return (
                                <div className="cards-small">
                                    <div className="card-small">
                                        <div className="card-small-image">
                                            <NavLink routeName="editlisting" navParams={{listingId: listing.id}}>
                                                <img src="" alt="Tasty Brazil Coffee"/>
                                            </NavLink>
                                        </div>

                                        <div className="card-small-content">
                                            <h3><a href="listing-detail.html">{listing.title}</a></h3>
                                            <h4><a href="listing-detail.html">{listing.suburb + " " + listing.postcode}</a></h4>
                                            <div className="card-small-price">{listing.price} / person</div>
                                        </div>
                                    </div>
                                </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        var profile = this.store.profile;
    }
}

UserProfileComponent.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default UserProfileComponent;
