(function () {
    describe('fake site', function () {
        it('should modified result div html', function (done) {
            this.timeout(10000);
            var fakeSiteUrl = window.location.href.replace('index.html', '') + 'fake-site.html';

            browser
                .openWindow(fakeSiteUrl)
                .then(function (win) {
                    win.waitFor(function () {
                        return win.windowRef.$;
                    }, 3000)
                    .then(function () {
                        win
                            .waitForElementExist('#result')
                            .then(function () {
                                expect(win.select('#result').text()).to.equal('content');
                                done();
                            })

                    });
                });
        })
    });
}());