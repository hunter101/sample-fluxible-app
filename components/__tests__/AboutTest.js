
jest.dontMock('../About.js');
var About = require('../About.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('About', function() {
    it('should render a title tag of <h2>About</h2>', function() {

        var DOM = TestUtils.renderIntoDocument(<About />);
        var about = TestUtils.findRenderedDOMComponentWithTag(DOM, 'h2');
        expect(about.getDOMNode().textContent).toEqual('About');
    });
});
