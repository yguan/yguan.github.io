define(['exports'], function (exports, Browser) {
    var timeoutMaxInMs = 10000;

    function createTests() {
        describe('Ext JS API site', function () {

            it('should select overview tab', function (done) {
                this.timeout(timeoutMaxInMs);

                browser
                    .openWindow('http://docs.sencha.com/extjs/4.2.2/')
                    .waitAndSelectElement('doctabs', function (doctabs) {
                        var overviewTab = doctabs.down('.doctab.overview.classes');
                        overviewTab.dom.click();
                    })
                    .execute(function (win, next) {
                        win.location.hash.should.equal('#!/api');
                        done();
                    })
                    .end();
            });
        });
    }

    exports.create = createTests;
});