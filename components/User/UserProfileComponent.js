import React from 'react';
import NavLink from '../misc/NavLink';
import _ from 'underscore';
import UserProfileStore from '../../stores/UserProfileStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
class UserProfileComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.context = context;
    }

    render() {

        var profile = this.props.profile;
        console.log('rendering');

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

                                    var coverImage = _.find(listing.Files, {type: "coverImage"});
                                    return (
                                <div key={listing.id} className="cards-small">
                                    <div className="card-small">
                                        <div className="card-small-image">
                                            <NavLink routeName="editlisting" navParams={{listingId: listing.id}}>
                                                <img src="ass" />
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
    }
}

export default provideContext(connectToStores(
    UserProfileComponent,
    [UserProfileStore],
    function(context) {
        var upStore = context.getStore(UserProfileStore);
        return {
            profile: upStore.getProfile()
        }
}));
