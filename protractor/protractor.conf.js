exports.config = {
    specs: ['*.js'],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine',

    // remove the dependency on angular
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    }
};
