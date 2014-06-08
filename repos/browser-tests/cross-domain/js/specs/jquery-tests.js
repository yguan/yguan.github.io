define(['exports', 'lib/browser'], function (exports, Browser) {
    var timeoutMaxInMs = 10000;

    function createTests() {
        describe('jquery.com', function () {

            it('should type some text to the search box', function (done) {
                this.timeout(timeoutMaxInMs);

                var searchBoxSelector = '.searchform :input';

                browser
                    .openWindow('http://jquery.com/')
                    .waitForElementExist(searchBoxSelector) // this is optional
                    .waitAndSelectElement(searchBoxSelector, function (searchBox) {
                        searchBox.val().should.equal('');
                    })
                    .execute(function (win, next) {
                        var searchBox = win.$('.searchform :input'),
                            textToType = 'ajax';

                        searchBox.on('click', function () {
                            searchBox.val().should.equal(textToType);
                            done();
                        });
                        searchBox.val(textToType).click();
                    })
                    .end();
            });

//        it('should navigate to api documentation', function (done) {
//            this.timeout(5000);
//
//            browser
//                .execute(function (win, next) {
//                    win.$('#menu-top .menu-item:eq(1) a')[0].click();
//                    done();
//                })
//                .waitFor(function (win) {
//                    return win.location.hostname === 'api.jquery.com';
//                })
//                .execute(function (win, next) {
//                    done();
//                })
//                .end();
//        });


        });
    }

    exports.create = createTests;
});