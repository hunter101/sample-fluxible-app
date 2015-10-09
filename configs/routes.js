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
        title: 'About',
        handler: require('../components/About')
    },
    test: { 
        path: "/test",
        method: "get",
        page: "test",
        title: "test page",
        handler: require('../components/Test'),
        action: function(context, payload, done) {
            context.executeAction(getMessages, {}, function(){
                done()
            }
        );
        }
    }
};
