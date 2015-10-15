
jest.dontMock('../Test.js');
var Test = require('../Test.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('When the page renders on the server', function () {
    it('show the login page', function () {
        var DOM = TestUtils.renderIntoDocument(<Test query />);
        var title = TestUtils.findRenderedDOMComponentWithTag(DOM, 'h2');
        expect(title.getDOMNode().textContent).toEqual('Login');
    });
});
