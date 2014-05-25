(function () {
    var windowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes',
        addEventListenerMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
        defaultTimeoutMs = {
            elementExist: 3000
        };

    function elementExist(selector, win) {
        return win.$(selector).length > 0;
    }

    Window = function (win) {
        return {
            waitForElementExist: function (selector, timeOutMillis) {
                return waitFor(function () {
                    return elementExist(selector, win);
                }, timeOutMillis || defaultTimeoutMs.elementExist);
            },
            waitFor: waitFor,
            select: function (selector) {
                return win.$(selector);
            },
            windowRef: win
        };
    };

}());