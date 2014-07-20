/*jslint nomen: true*/
/*global define,require*/

define(function (require, exports) {
    'use strict';

    exports.getQueryParameter = function (name) {
        name = name.toLowerCase().replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search.toLowerCase());
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
});

