
jest.dontMock('../About.js');
var About = require('../About.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('About', function() {
    it('should render a title tag of <h2>About</h2>', function() {
    
        var about = TestUtils.renderIntoDocument(<About />);
            about = React.findDOMNode(about);

        expect(about.textContent).toEqual('AboutThis is a description of the site.');
    });
});