describe('app login flow', function() {

    var loginUrl, homeUrl, name;

    it('sets up initial variables', function() {
        // Can be considered to be beforeAll, which Protractor lacks.
        browser.get('/login');
        loginUrl = browser.getCurrentUrl();
        browser.get('/');
        homeUrl = browser.getCurrentUrl();
    });

    it('registers a user and redirects to login page', function() {
        browser.get('/register');
        name = 'user' + Math.floor(Math.random() * 100000);
        $('#username').sendKeys(name);
        $('#displayname').sendKeys('Test');
        $('#password').sendKeys('Secret123');
        $('button').click();
        browser.wait(protractor.ExpectedConditions.visibilityOf($('.page-login')), 3000);
        expect(browser.getCurrentUrl()).toBe(loginUrl);
        expect(browser.getTitle()).toEqual('Login Page');
    });

    it('logs in correctly', function() {
        browser.get('/login');
        $('#username').sendKeys(name);
        $('#password').sendKeys('Secret123');
        $('button').click();
        expect(browser.getCurrentUrl()).toBe(homeUrl);
    });
});
