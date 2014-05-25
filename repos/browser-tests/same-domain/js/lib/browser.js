(function () {
    var windowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes',
        addEventListenerMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';

    browser = {
        openWindow: function (url) {
            var win = window.open(url, 'Test_Site', this.windowFeatures);
            return new Promise(function (resolve, reject) {
                win[addEventListenerMethod]('load', function () {
                    resolve(new Window(win));
                });
            });
        }
    };
}());