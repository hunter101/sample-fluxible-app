import React from 'react';
import NavLink from '../misc/NavLink';
import ListingCardComponent from './ListingCardComponent';
import UpdateUserProfile from '../../actions/updateuserprofile';
import ListingUtils from '../../mixins/ListingUtils';
import _ from 'underscore';
import UserProfileStore from '../../stores/UserProfileStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import FileUploadComponent from '../misc/FileUploadComponent';
import ImagePreviewComponent from '../misc/ImagePreviewComponent';
var FRC = require('formsy-react-components');
var Input = FRC.Input;
var Textarea = FRC.Textarea;

class UserProfileComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.state = {};
        this.state.canEdit = props.user.id === props.profile.id;
        this.state.canSubmit = true;
    }

    submitForm(data) {
        console.log(data);
        var profileId = this.props.profile.id;
        this.props.context.executeAction(
            UpdateUserProfile,
            {
                profileId: profileId,
                data: data
            }
        );
    }

    enableSubmit() {
        this.setState({
            canSubmit: true
        })
    }

    disableSubmit() {
        this.setState({
            canSubmit: false
        })
    }

    render() {

        var profile = this.props.profile;
        var listings = profile.Listings.map((listing) => {
            return (
                <ListingCardComponent key={listing.id} listing={listing}/>
            )
        });

        var sharedProps = {
            layout: "vertical",
            validatePristine: false,
            disabled: !this.state.canEdit
        };

        var profileImage = ListingUtils.userProfilePreview(profile, {h: 225, w:225});

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-lg-3">
                        <div className="sidebar">
                            <div className="widget">
                                <div className="user-photo">

                                    <img src={profileImage} />
                                    <FileUploadComponent
                                        text="Drop image or click to update profile picture"
                                        multiple={false}
                                        entity={profile}
                                        type="profileImage" />

                                </div>
                            </div>
                            <div className="widget">
                                <h2 className="widgettitle">My Listings</h2>
                                {listings}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-8 col-lg-9">
                        <div className="content">
                            <div className="page-title">
                                <h1>My Profile: {profile.displayName}</h1>
                            </div>
                            <div className="background-white p20 mb30">

                                <Formsy.Form
                                    onValid={this.enableSubmit.bind(this)}
                                    onInvalid={this.disableSubmit.bind(this)}
                                    onSubmit={this.submitForm.bind(this)}
                                    >

                                    <h3 className="page-title">
                                        Contact Information

                                        <input className="btn btn-primary btn-xs pull-right"
                                               disabled={!this.state.canSubmit} type="submit"
                                               defaultValue="Submit"/>
                                    </h3>


                                    <div className="row">
                                        <div className="form-group col-sm-6">
                                            <Input
                                                {...sharedProps}
                                                name="displayName"
                                                value={profile.displayName}
                                                label="Display Name"
                                                type="text"
                                                required
                                                />
                                        </div>

                                        <div className="form-group col-sm-6">
                                            <Input
                                                {...sharedProps}
                                                name="email"
                                                value={profile.email}
                                                label="Email"
                                                type="text"
                                                />
                                        </div>

                                    </div>
                                </Formsy.Form>
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
    function (context) {
        var upStore = context.getStore(UserProfileStore);
        return {
            profile: upStore.getProfile()
        }
    }
));
