import React from 'react'
import NavLink from '../misc/NavLink';
import ListingUtils from '../../mixins/ListingUtils';

var ListingCardComponent = React.createClass({

    mixins: [ListingUtils],

    render: function () {
        var listing = this.props.listing;
        var coverImagePreview = this.coverImagePreview(listing.Files);
        return (
            <div className="cards-small">
                <NavLink routeName="editlisting" navParams={{listingId: listing.id}}>
                    <div className="card-small">
                        <div className="card-small-image">
                            <img src={coverImagePreview + "?dim=80x80"} />
                        </div>

                        <div className="card-small-content">
                            <h3>{listing.title}</h3>
                            <h4>{listing.suburb + " " + listing.postcode}</h4>

                            <div className="card-small-price">{listing.price} / person</div>
                        </div>
                    </div>
                </NavLink>
            </div>
        )
    }
});

export default ListingCardComponent;
