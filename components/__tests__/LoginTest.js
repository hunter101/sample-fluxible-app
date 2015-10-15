
jest.dontMock('../Login.js');
var Login = require('../Login.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Login', function() {
    it('should render a title tag of <h2>Login</h2>', function() {
        var DOM = TestUtils.renderIntoDocument(<Login query />);
        var title = TestUtils.findRenderedDOMComponentWithTag(DOM, 'h2');
        expect(title.getDOMNode().textContent).toEqual('Login');
    });
});

//describe('Non auth user attempts to login', function () {
//    it('should attempt to login then reload page and display message', function () {
//        var DOM = TestUtils.renderIntoDocument(<Login />);
//        var usernameInput = TestUtils.findRenderedDOMComponentWithClass(DOM, 'username');
//        var passwordInput = TestUtils.findRenderedDOMComponentWithClass(DOM, 'password');
//        usernameInput.getDOMNode().value = "asd";
//        passwordInput.getDOMNode().value = "asd";
//        var submitButton = TestUtils.findRenderedDOMComponentWithClass(DOM, 'submit').getDOMNode();
//        React.addons.TestUtils.Simulate.click(submitButton);
//        var DOM = TestUtils.renderIntoDocument(<Login />);
//        var errorMessage = DOM.findRenderedDOMComponentWithClass(DOM, 'message').getDOMNode();
//    });
//});
