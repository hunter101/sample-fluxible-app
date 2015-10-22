var React = require('react'),
    TestUtils = require('react-addons-test-utils'),
    UserProfileComponent = require('../UserProfileComponent'),
    expect = require('expect'),
    BaseStore = require('fluxible/addons/BaseStore'),
    UserProfileStore = require('../../../stores/UserProfileStore');

import { connectToStores, provideContext } from 'fluxible-addons-react';
import {createMockComponentContext} from 'fluxible/utils';

//class MockFooStore extends BaseStore {
//    constructor (dispatcher) {
//        super(dispatcher);
//        this.foo = 'foo';
//        this.profile = {};
//        this.profile.Listings = [];
//        this.profile.displayName = "Dave";
//    }
//    handleFoo (payload) {
//        this.foo = payload;
//        this.emitChange();
//    }
//    getFoo () {
//        return this.foo;
//    }
//    getProfile() {
//        return this.profile;
//    }
//}
//MockFooStore.storeName = 'UserProfileStore'; // Matches FooStore.storeName
//MockFooStore.handlers = {
//    'profile': 'handleFoo'
//};

describe('UserProfileComponent', function () {

    var component,
        componentContext;

    beforeEach(function (done) {
        componentContext = createMockComponentContext({
            stores: [UserProfileStore]
        });
        done();
    });

    it("renders an h1", function () {
        var userprofile = TestUtils.renderIntoDocument(
            <UserProfileComponent context={componentContext}/>
        );

        var h1 = TestUtils.findRenderedDOMComponentWithTag(
            userprofile, 'h1'
        );

        expect(h1.textContent).toEqual("My Profile: ");
    });

});

