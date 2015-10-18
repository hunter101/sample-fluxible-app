import React from 'react';
import Dropzone from 'react-dropzone';
import _ from 'underscore';
import Formsy from 'formsy-react';
import CreateListingAction from '../../actions/createlisting';
import DeleteFileAction from '../../actions/deletefile';
import EditListingStore from '../../stores/EditListingStore';
import FileUploadComponent from './FileUploadComponent';
import ImagePreviewComponent from './ImagePreviewComponent';
import { connectToStores } from 'fluxible-addons-react';
var FRC = require('formsy-react-components');
var Input = FRC.Input;
var Textarea = FRC.Textarea;
var Select = FRC.Select;
var CheckboxGroup = FRC.CheckboxGroup;
var File = FRC.File;
var listingOptions = require('../../models/extras/listingOptions');


class EditListingComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.store = this.context.getStore('EditListingStore');
        this.layout = 'vertical';
        this.validatePristine = false;
        this.disabled = false;
        this.state = {};
        this.state.canSubmit = true;
    }

    componentWillUnmount() {
        this.store.clearListing();
    }

    submitForm(data) {

        // If the listing is being created, attach the user
        if (!this.store.listing.id) {
            data.userId = this.props.user.id;
        }
        this.context.executeAction(CreateListingAction, data);
    }

    enableButton() {
        //this.setState({
        //    canSubmit: true
        //});
    }

    disableButton() {
        //this.setState({
        //    canSubmit: false
        //});
    }

    onDrop(files) {
    }

    handleDeleteFile(file) {
        this.context.executeAction(DeleteFileAction,
            {
                file: file,
                listing: this.store.listing
            });
    }

    render() {

        var listing = this.store.listing;
        var coverImage = _.find(listing.Files, function (file) {
                return file.type === "coverImage";
            }) || [];
        var logo = _.find(listing.Files, {type: 'logo'}) || [];
        var gallery = _.difference(listing.Files, [coverImage, logo]) || [];

        var categoryOptions = [
            {value: "", label: "Please select a category"},
            {value: "option 1", label: "Option 1"},
            {value: "option 2", label: "Option 2"}
        ];

        var stateOptions = [
            {value: '', label: "Please select a state"},
            {value: 'NSW', label: "NSW"},
            {value: 'VIC', label: "VIC"},
            {value: 'QLD', label: "QLD"},
            {value: 'NT', label: "NT"},
            {value: 'ACT', label: "ACT"},
            {value: 'SA', label: "SA"},
            {value: 'WA', label: "WA"},
            {value: 'TAS', label: "TAS"}
        ];

        var sharedProps = {
            layout: this.layout,
            validatePristine: this.validatePristine,
            disabled: this.disabled
        };

        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-8 col-lg-9">
                        <div className="content">
                            <div className="page-title">
                                <h1>Edit Listing: {listing.title}</h1>
                            </div>
                            <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton}
                                         onSubmit={this.submitForm.bind(this)}
                                         ref="form">

                                <div className="background-white p30 mb30">
                                    <h3 className="page-title">Description</h3>

                                    <Input
                                        {...sharedProps}
                                        name="title"
                                        value={listing.title}
                                        label="Listing Title"
                                        type="text"
                                        placeholder="Here is a text input."
                                        help="This is a required text input."
                                        validationError="This field is required sucker"
                                        required
                                        />

                                    <Textarea
                                        {...sharedProps}
                                        name="description"
                                        label="Description"
                                        value={listing.description}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="Listing Description"
                                        rows="8">
                                    </Textarea>

                                </div>


                                <div className="background-white p30 mb30">
                                    <h3 className="page-title">Attributes</h3>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i
                                                    className="fa fa-dollar"></i></span>
                                                <Select
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="category"
                                                    value={listing.category}
                                                    label="Select a category"
                                                    options={categoryOptions}
                                                    required
                                                    />
                                            </div>

                                            <div className="input-group">
                                                <span className="input-group-addon"><i
                                                    className="fa fa-dollar"></i></span>
                                                <Input
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="price"
                                                    value={listing.price}
                                                    type="text"
                                                    placeholder="Price"
                                                    />
                                            </div>

                                            <div className="input-group">
                                                <span className="input-group-addon"><i
                                                    className="fa fa-phone"></i></span>
                                                <Input
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="phone"
                                                    value={listing.phone}
                                                    type="phone"
                                                    placeholder="Phone"
                                                    required
                                                    />
                                            </div>


                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-at"></i></span>
                                                <Input
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="email"
                                                    value={listing.email}
                                                    type="email"
                                                    placeholder="Email"
                                                    required
                                                    />
                                            </div>
                                        </div>


                                        <div className="col-sm-6">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-building-o"></i></span>
                                                <Input
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="address"
                                                    value={listing.address}
                                                    type="text"
                                                    placeholder="Address"
                                                    required
                                                    />
                                            </div>


                                            <div className="input-group">
                                                <span className="input-group-addon"><i
                                                    className="fa fa-map-o"></i></span>
                                                <Input
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="suburb"
                                                    value={listing.suburb}
                                                    type="text"
                                                    placeholder="Suburb"
                                                    required
                                                    />
                                            </div>

                                            <div className="input-group">
                                                <span className="input-group-addon"><i
                                                    className="fa fa-marker"></i></span>
                                                <Input
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="postcode"
                                                    value={listing.postcode}
                                                    type="text"
                                                    placeholder="Postcode"
                                                    required
                                                    />
                                            </div>

                                            <div className="input-group">
                                                <span className="input-group-addon"><i
                                                    className="fa fa-dollar"></i></span>
                                                <Select
                                                    {...sharedProps}
                                                    layout="elementOnly"
                                                    name="state"
                                                    value={listing.state}
                                                    label="State"
                                                    options={stateOptions}
                                                    required
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-sm-6">
                                        <div className="background-white p30 mb30">
                                            <h3 className="page-title">Logo Image</h3>
                                            <FileUploadComponent multiple={false} listing={listing} type="logo" />
                                            <ImagePreviewComponent listing={listing} images={logo} />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="background-white p30 mb30">
                                            <h3 className="page-title">Cover Image</h3>
                                            <FileUploadComponent multiple={false} listing={listing} type="coverImage" />
                                            <ImagePreviewComponent listing={listing} images={coverImage} />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="background-white p30 mb30">
                                            <h3 className="page-title">Gallery ({gallery.length} files)</h3>
                                            <FileUploadComponent multiple={true} max={12} listing={listing} type="gallery" />
                                            <ImagePreviewComponent listing={listing} images={gallery} />
                                        </div>
                                    </div>

                                </div>


                                <div className="background-white p30 mb30">
                                    <h3 className="page-title">Amenities</h3>

                                      <CheckboxGroup
                                        {...sharedProps}
                                        name="options"
                                        label="Select some options"
                                        options={listingOptions}
                                        value={listing.options.selected ? listing.options.selected : []}
                                        multiple
                                        />

                                </div>

                                <div className="center">
                                    <input className="btn btn-primary" disabled={!this.state.canSubmit} type="submit"
                                           defaultValue="Submit"/>
                                </div>

                            </Formsy.Form>


                        </div>

                    </div>


                    <div className="col-sm-4 col-lg-3">
                        <div className="sidebar">
                            <div className="widget">
                                <h2 className="widgettitle">Recent Listings</h2>


                                <div className="cards-small">
                                    <div className="card-small">
                                        <div className="card-small-image">
                                            <a href="listing-detail.html">
                                                <img src="/assets/img/tmp/product-2.jpg" alt="Tasty Brazil Coffee"/>
                                            </a>
                                        </div>


                                        <div className="card-small-content">
                                            <h3><a href="listing-detail.html">Tasty Brazil Coffee</a></h3>
                                            <h4><a href="listing-detail.html">New York / Village</a></h4>

                                            <div className="card-small-price">$180 / person</div>
                                        </div>

                                    </div>

                                </div>


                                <div className="cards-small">
                                    <div className="card-small">
                                        <div className="card-small-image">
                                            <a href="listing-detail.html">
                                                <img src="/assets/img/tmp/product-3.jpg" alt="Healthy Breakfast"/>
                                            </a>
                                        </div>


                                        <div className="card-small-content">
                                            <h3><a href="listing-detail.html">Healthy Breakfast</a></h3>
                                            <h4><a href="listing-detail.html">New York / Village</a></h4>

                                            <div className="card-small-price">$180 / person</div>
                                        </div>

                                    </div>

                                </div>


                                <div className="cards-small">
                                    <div className="card-small">
                                        <div className="card-small-image">
                                            <a href="listing-detail.html">
                                                <img src="/assets/img/tmp/product-4.jpg" alt="Coffee &amp; Newspaper"/>
                                            </a>
                                        </div>


                                        <div className="card-small-content">
                                            <h3><a href="listing-detail.html">Coffee &amp; Newspaper</a></h3>
                                            <h4><a href="listing-detail.html">New York / Village</a></h4>

                                            <div className="card-small-price">$180 / person</div>
                                        </div>

                                    </div>

                                </div>


                            </div>


                            <div className="widget">
                                <h2 className="widgettitle">Filter</h2>

                                <div className="background-white p20">
                                    <Formsy.Form method="post" action="?">
                                        <div className="form-group">
                                            <label htmlFor="">Keyword</label>
                                            <input type="text" className="form-control" name="" id=""/>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="">Category</label>

                                            <select className="form-control" title="Select Category">
                                                <option>Automotive</option>
                                                <option>Real Estate</option>
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="">Location</label>
                                            <select className="form-control" title="Select Location">
                                                <option>New York</option>
                                                <option>San Francisco</option>
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="">Starting Price</label>
                                            <input type="text" className="form-control" name="" id=""/>
                                        </div>


                                        <button className="btn btn-primary btn-block" type="submit">Search</button>
                                    </Formsy.Form>
                                </div>
                            </div>


                            <div className="widget">
                                <h2 className="widgettitle">Working Hours</h2>

                                <div className="p20 background-white">
                                    <div className="working-hours">
                                        <div className="day clearfix">
                                            <span className="name">Mon</span><span
                                            className="hours">07:00 AM - 07:00 PM</span>
                                        </div>


                                        <div className="day clearfix">
                                            <span className="name">Tue</span><span
                                            className="hours">07:00 AM - 07:00 PM</span>
                                        </div>


                                        <div className="day clearfix">
                                            <span className="name">Wed</span><span
                                            className="hours">07:00 AM - 07:00 PM</span>
                                        </div>


                                        <div className="day clearfix">
                                            <span className="name">Thu</span><span
                                            className="hours">07:00 AM - 07:00 PM</span>
                                        </div>


                                        <div className="day clearfix">
                                            <span className="name">Fri</span><span
                                            className="hours">07:00 AM - 07:00 PM</span>
                                        </div>


                                        <div className="day clearfix">
                                            <span className="name">Sat</span><span
                                            className="hours">07:00 AM - 02:00 PM</span>
                                        </div>


                                        <div className="day clearfix">
                                            <span className="name">Sun</span><span className="hours">Closed</span>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="widget">
                                <h2 className="widgettitle">Categories</h2>

                                <ul className="menu">
                                    <li><a href="#">Automotive</a></li>
                                    <li><a href="#">Jobs</a></li>
                                    <li><a href="#">Nightlife</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Transportation</a></li>
                                    <li><a href="#">Real Estate</a></li>
                                    <li><a href="#">Restaurants</a></li>
                                </ul>

                            </div>


                            <div className="widget">
                                <h2 className="widgettitle">Archives</h2>

                                <ul className="menu">
                                    <li><a href="#">August <strong className="pull-right">12</strong></a></li>
                                    <li><a href="#">July <strong className="pull-right">23</strong></a></li>
                                    <li><a href="#">June <strong className="pull-right">53</strong></a></li>
                                </ul>

                            </div>


                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

EditListingComponent.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

export default connectToStores(
    EditListingComponent,
    [EditListingStore],
    function (context, props) {
        return {
        }
    }
);
