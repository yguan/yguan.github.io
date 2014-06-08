define([
    'chai',
    'lib/browser',
    'specs/extjs-tests',
    'specs/jquery-tests'
], function (chai, Browser, extjsTests, jqueryTests) {
    chai.should();
    window.browser = Browser.getInstance().init();

    if (window.runExtjsTests) {
        extjsTests.create();
    } else {
        jqueryTests.create();
    }
});