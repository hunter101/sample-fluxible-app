describe('Authenticated user funnctionality', function () {

    var loginUrl, homeUrl, name;

    it('sets up initial variables', function () {
        // Can be considered to be beforeAll, which Protractor lacks.
        browser.get('/login');
        loginUrl = browser.getCurrentUrl();
        browser.get('/');
        homeUrl = browser.getCurrentUrl();
        browser.get('/create-listing');
        createListingUrl = browser.getCurrentUrl();
    });

    it('registers a user and redirects to login page', function () {
        browser.get('/register');
        name = 'user' + Math.floor(Math.random() * 100000);
        displayName = "Dave Smith";
        $('#username').sendKeys(name);
        $('#displayname').sendKeys(displayName);
        $('#password').sendKeys('Secret123');
        $('button').click();
        browser.wait(protractor.ExpectedConditions.visibilityOf($('.page-login')), 3000);
        expect(browser.getCurrentUrl()).toBe(loginUrl);
        expect(browser.getTitle()).toEqual('Login Page');
    });

    it('logs in correctly', function () {
        browser.get('/login');
        $('#username').sendKeys(name);
        $('#password').sendKeys('Secret123');

        $('button').click();
        var title = $("h1");
        expect(title.getText()).toEqual('My Profile: ' + displayName);
        profilePageUrl = browser.getCurrentUrl();
    });

    it('allows the logged in user to access the create profile page', function () {
        browser.get('/create-listing');
        expect(browser.getTitle()).toEqual('Create a new listing');
    });

    it('Successfully redirects to user profile page after creating a new listing', function () {
        browser.get('/create-listing');
        $('#title').sendKeys("New ListasdingA");
        $('#description').sendKeys("New Descrasdiptiona");
        $('#category').sendKeys("option 1");
        $('#price').sendKeys("233244");
        $('#phone').sendKeys("0237844");
        $('#email').sendKeys("dava8e@shit.com");
        $('#address').sendKeys("2008 Bellahagg Road");
        $('#suburb').sendKeys("Mascot");
        $('#postcode').sendKeys("2039");
        $('#state').sendKeys("NSW");
        $('#submit').click();
        browser.wait(protractor.ExpectedConditions.visibilityOf($('.page-user-profile')), 3000);
        expect(browser.getCurrentUrl()).toBe(profilePageUrl);
    });

    it('logs out correctly', function () {
        browser.get('/logout');
        expect(browser.getCurrentUrl()).toBe(homeUrl);
    })
});
