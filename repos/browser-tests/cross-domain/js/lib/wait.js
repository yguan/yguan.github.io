/*jslint nomen: true*/
/*global $,define,require,_ */

define(['exports'], function (exports) {
    'use strict';

    var defaultCheckIntervalInMs = 100;

    function executeFn(fn) {
        return typeof(fn) === "string" ? eval(fn) : fn();
    }

    /**
     * Wait until the test condition is true or a timeout occurs. Useful for waiting
     * on a server response or for a ui change (fadeIn, etc.) to occur.
     *
     * @param testFn javascript condition that evaluates to a boolean,
     * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
     * as a callback function.
     * @param onReady what to do when testFx condition is fulfilled,
     * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
     * as a callback function.
     * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
     */
    exports.waitFor = function (testFn, onReady, onTimeout, timeOutMillis) {
        var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
            start = new Date().getTime(),
            condition = false,
            interval = setInterval(function () {
                if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
                    // If not time-out yet and condition not yet fulfilled
                    condition = executeFn(testFn); //< defensive code
                } else {
                    if (!condition) {
                        // If condition still not fulfilled (timeout but condition is 'false')
                        executeFn(onTimeout);
                    } else {
                        // Condition fulfilled (timeout and/or condition is 'true')
                        executeFn(onReady); //< Do what it's supposed to do once the condition is fulfilled
                    }
                    clearInterval(interval); //< Stop this interval
                }
            }, defaultCheckIntervalInMs); //< repeat check
    }
});