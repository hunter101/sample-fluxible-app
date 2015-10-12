import getMessages from '../actions/test';

export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home')
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        currentPageName: 'About',
        title: 'About',
        handler: require('../components/About')
    },
    test: {
        path: "/test",
        method: "get",
        page: "test",
        title: "test page",
        auth: 'ACCESS TEST',
        handler: require('../components/Test'),
        action: function(context, payload, done) {
            console.log(context);
            context.executeAction(getMessages, {}, function(){
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
        handler: require('../components/Login')
    },
    register: {
        path: "/register",
        method: "get",
        page: "register",
        title: "Register a new user",
        auth: "CAN REGISTER",
        showLinkNonAuth: false,
        handler: require('../components/Register')
    },
    logout: {
        path: "/logout",
        method: "get",
        page: "logout",
        title: "Logout",
        auth: "CAN LOGOUT",
        showLinkNonAuth: false,
        renderFullPage: true
    }
};
