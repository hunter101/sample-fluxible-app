var React = require('react'),
    TestUtils = require('react-addons-test-utils'),
    UserProfileComponent = require('../UserProfileComponent'),
    expect = require('expect'),
    BaseStore = require('fluxible/addons/BaseStore'),
    UserProfileStore = require('../../../stores/UserProfileStore'),
    loadUserProfileAction = require('../../../actions/loaduserprofile');

var util = require('util');

import RouteStore from '../../../stores/RouteStore'
import { connectToStores, provideContext } from 'fluxible-addons-react';
import {createMockComponentContext} from 'fluxible/utils';

describe('UserProfileComponent', function () {

    var component,
        componentContext;

    beforeEach(function (done) {
        componentContext = createMockComponentContext({
            stores: [UserProfileStore, RouteStore]
        });

        var profile = {
            displayName: "Andy Hunter",
            Listings: [
                {
                    id: 1,
                    title: "Lisitng 1",
                    suburb: "Suburb 1",
                    postcode: "2345",
                    price: "234",
                    Files: []
                },
                {
                    id: 2,
                    title: "Listing 2",
                    suburb: "Suburb 2",
                    postcode: "2345",
                    price: "1 million dollars",
                    Files: []
                }
            ]
        };

        componentContext.getStore('UserProfileStore').profile = profile;

        component = TestUtils.renderIntoDocument(
            <UserProfileComponent context={componentContext}/>
        );

        done();
    });

    it("renders an h1 with the correct displayName", function () {
        var h1 = TestUtils.findRenderedDOMComponentWithTag(
            component, 'h1'
        );
        expect(h1.textContent).toEqual("My Profile: Andy Hunter");
    });

    it("loads the correct number of listing", function () {
        var listings = TestUtils.scryRenderedDOMComponentsWithClass(
            component, 'card-small'
        );
        expect(listings.length).toEqual(2);
    });
});

