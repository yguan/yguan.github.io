define([
    'chai',
    'specs/extjs-tests',
    'specs/jquery-tests'
], function (chai, extjsTests, jqueryTests) {
    chai.should();
    if (window.runExtjsTests) {
        extjsTests.create();
    } else {
        jqueryTests.create();
    }
});