define([
    'chai',
    'lib/browser',
    'specs/extjs-tests',
    'specs/jquery-tests'
], function (chai, browser, extjsTests, jqueryTests) {
    chai.should();
    window.browser = browser.init();

    if (window.runExtjsTests) {
        extjsTests.create();
    } else {
        jqueryTests.create();
    }
});