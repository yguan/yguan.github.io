/*jslint nomen: true*/
/*global $,define,require,_ */

define([
    'exports',
    'lib/async-chain',
    'lib/wait'
], function (exports, asyncChain, wait) {
    'use strict';

    var windowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes',
        addEventListenerMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
        browser;

    function waitFor(testFx, onReady, timeoutMessage, timeOutMillis) {
        wait.waitFor(testFx, onReady, function () {
            throw timeoutMessage;
        }, timeOutMillis)
    }

    /*
     * Change this function to have use different query
     */
    function selectElement(selector, win) {
        if (win.$) {
            return win.$(selector);
        }
        if (win.Ext) {
            return win.Ext.get(selector);
        }
        return null;
    }

    function elementExist(selector, win) {
        var element = selectElement(selector, win);
        if (element) {
            return true;
        }
        return false;
    }

    function Browser() {
    }

    Browser.prototype = {
        init: function (config) {
            var me = this;

            config = config || {};

            me.chain = config.chain || asyncChain.create();

            me.defaultTimeoutInMs = config.defaultTimeoutInMs || {
                elementExist: 3000,
                implicitWait: 100
            };
            return me;
        },
        openWindow: function (url) {
            var me = this;
            me.chain.add(function (next) {
                var win = window.open(url, 'win', windowFeatures);
                me.currentWindow = win;
                win[addEventListenerMethod]('load', function () {
                    next();
                });
            });

            return me;
        },
        waitFor: function (testFn, timeoutInMilliseconds) {
            var me = this,
                timeoutMessage = 'waitFor condition timeout';

            me.chain.add(function (next) {
                waitFor(function () {
                    return testFn(me.currentWindow);
                }, next, timeoutMessage, timeoutInMilliseconds || me.defaultTimeoutInMs.elementExist)
            });

            return me;
        },
        waitForElementExist: function (selector, timeoutInMilliseconds) {
            var me = this,
                timeoutMessage = 'waitForElementExist timeout for ' + selector;

            me.chain.add(function (next) {
                waitFor(function () {
                    return elementExist(selector, me.currentWindow);
                }, next, timeoutMessage, timeoutInMilliseconds || me.defaultTimeoutInMs.elementExist);
            });

            return me;
        },
        waitAndSelectElement: function (selector, onElementFound) {
            var me = this,
                timeoutMessage = 'waitForElementExist timeout for ' + selector;

            me.chain.add(function (next) {
                waitFor(function () {
                    return elementExist(selector, me.currentWindow);
                }, function () {
                    onElementFound(selectElement(selector, me.currentWindow));
                    if (next) {
                        next();
                    }
                }, timeoutMessage, me.defaultTimeoutInMs.elementExist);
            });

            return me;
        },
        execute: function (fn) {
            var me = this;
            me.chain.add(function (next) {
                fn(me.currentWindow, next);
            });

            return me;
        },
        end: function () {
            this.chain.run();
        },
        getIframe: function (iframeSelector) {
            var me = this,
                iframe = new Browser();

            iframe.init({
                chain: me.chain
            });

            me.waitAndSelectElement(iframeSelector, function (iframeElement) {
                iframe.currentWindow = iframeElement[0].contentWindow;
            });

            return iframe;
        }
    };

    exports.getInstance = function () {
        if (!browser) {
            browser = new Browser();
        }
        return browser;
    }
});