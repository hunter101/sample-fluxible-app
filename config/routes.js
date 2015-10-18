import getMessages from '../actions/test';
import loadListingAction from '../actions/loadlisting';
import loadProfileAction from '../actions/loaduserprofile';

export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        menu: "main",
        handler: require('../components/Home')
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        currentPageName: 'About',
        title: 'About',
        menu: "main",
        handler: require('../components/About')
    },
    test: {
        path: "/test",
        method: "get",
        page: "test",
        title: "test page",
        menu: "main",
        auth: 'ACCESS TEST',
        handler: require('../components/Test'),
        action: function (context, payload, done) {
            context.executeAction(getMessages, {}, function () {
                    done()
                }
            );
        }
    },
    login: {
        path: "/login",
        method: "get",
        page: "login",
        auth: "CAN LOGIN",
        redirectOnFail: "/",
        showLinkNonAuth: false,
        title: "Login Page",
        menu: "main",
        handler: require('../components/Login')
    },
    logout: {
        path: "/logout",
        method: "get",
        page: "logout",
        title: "Logout",
        menu: "main",
        auth: "CAN LOGOUT",
        showLinkNonAuth: false,
        renderFullPage: true
    },
    createlisting: {
        path: "/create-listing",
        method: "get",
        page: "createlisting",
        title: "Create a new listing",
        auth: "CREATE LISTING",
        redirectOnFail: "/",
        showLinkNonAuth: false,
        menu: "main",
        handler: require('../components/EditListing/EditListingComponent'),
        action: function (context, payload, done) {
            // If the user has been an editpage prior to this route
            // we need to reset the listing object as the component
            // doesn't get remounted as its the same handler.
            var store = context.getStore('EditListingStore');
            store.clearListing();
            done();
        }
    },
    editlisting: {
        path: "/edit-listing/:listingId",
        method: "get",
        page: "editlisting",
        title: "Edit Listing",
        auth: "EDIT OWN LISTING",
        redirectOnFail: "/",
        showLinkNonAuth: false,
        menu: null,
        handler: require('../components/EditListing/EditListingComponent'),
        action: function (context, payload, done) {
            var listingId = payload.get('params').get('listingId');
            context.executeAction(loadListingAction,
                {id: listingId,
                 auth: true
                },
                function () {
                    done()
                }
            )
        }
    },
    userprofile: {
        path: "/profile/:profileId",
        method: "get",
        page: "userprofile",
        title: "User Profile",
        auth: "VIEW USER PROFILE",
        redirectOnFail: "/",
        showLinkNonAuth: false,
        menu: null,
        handler: require('../components/User/UserProfileComponent'),
        action: function (context, payload, done) {
            var profileId = payload.get('params').get('profileId');
            context.executeAction(loadProfileAction,
                {id: profileId},
                function () {
                    done()
                }
            )
        }
    },
    register: {
        path: "/register",
        method: "get",
        page: "register",
        title: "Register a new user",
        menu: "main",
        auth: "CAN REGISTER",
        showLinkNonAuth: false,
        handler: require('../components/Register')
    }
};
