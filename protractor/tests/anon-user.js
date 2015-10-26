describe('Anon user funnctionality', function () {

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

    it("doesn't allow an anon user to access the create listing page", function () {
        browser.get('/create-listing');
        var messageBoxText = $('.messagePopup p');
        expect(messageBoxText.getText()).toEqual("You don't have the correct permissions to access this content");
    });

    it("doesn't allow an anon user to access the create profile page", function () {
        browser.get('/profile/1');
        var messageBoxText = $('.messagePopup p');
        expect(messageBoxText.getText()).toEqual("You don't have the correct permissions to access this content");
    });

    it("doesn't allow an anon user to access the test page from the nav bar", function () {
        browser.get('/');
        $('.header-nav-primary li').eq(2).click();
        expect(browser.getCurrentUrl()).toEqual('/login/redirect=/test');
    })

});
