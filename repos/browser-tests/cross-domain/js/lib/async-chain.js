/*jslint nomen: true*/
/*global $,define,require,_ */

define(['exports'], function (exports) {
    'use strict';

    // get the wrap idea from http://lennybacon.com/post/2011/10/03/chainingasynchronousjavascriptcalls
    function wrap(fn, next) {
        return function () {
            fn(next);
        };
    }

    function AsyncCahin() {
        this.methods = [];
    }

    AsyncCahin.prototype.add = function (fn) {
        this.methods.push(fn);
    };
    AsyncCahin.prototype.run = function () {
        var me = this,
            endIndex = me.methods.length - 1,
            i = endIndex;

        while (i > -1) {
            me.methods[i] = wrap(me.methods[i], i === endIndex ? null : me.methods[i + 1]);
            i = i - 1;
        }

        me.methods[0]();

        me.methods = []; // clear methods
    };

    exports.create = function () {
        return new AsyncCahin();
    };
});