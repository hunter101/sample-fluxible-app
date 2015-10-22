var React = require('react'),
    TestUtils = require('react-addons-test-utils'),
    AboutComponent = require('../../About'),
    expect = require('expect'),
    BaseStore = require('fluxible/addons/BaseStore');

import {createMockComponentContext} from 'fluxible/utils';



describe('AboutComponent', function () {

    //var React,
    //    NavLink,
    //    _,
    //    UserProfileStore,
    //    connectToStores,
    //    provideContext,
    //    handleHistroy;

    //var componentContext = createMockComponentContext({
    //    stores: [MockFooStore]
    //});

    //React = require('React');

    var context = {
        executeAction: function(){},
    };

// the mock FooStore
    class MockFooStore extends BaseStore {
        constructor (dispatcher) {
            super(dispatcher);
            this.foo = 'foo';
        }
        handleFoo (payload) {
            this.foo = payload;
            this.emitChange();
        }
        getFoo () {
            return this.foo;
        }
    }
    MockFooStore.storeName = 'UserProfileStore'; // Matches FooStore.storeName
    MockFooStore.handlers = {
        'profile': 'handleFoo'
    };

    var componentContext = createMockComponentContext({
        stores: [MockFooStore]
    });

    it("renders an h1", function () {
        var about = TestUtils.renderIntoDocument(
            <AboutComponent context={componentContext} />
        );

        var h1 = TestUtils.findRenderedDOMComponentWithTag(
            about, 'h1'
        );

        expect(h1.textContent).toEqual("FAQ");
    });
});
