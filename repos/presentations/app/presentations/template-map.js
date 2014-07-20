/*jslint nomen: true*/
/*global define,require*/

define(function (require, exports) {
    'use strict';

    var templateMap = {
        'browser-automation': {
            name: 'browser-automation.tpl',
            title: 'In-Browser Automation'
        }
    };

    exports.getTemplateData = function (name) {
        return templateMap[name] || {
            name: 'default.tpl',
            title: 'Yong Guan\'s Presentations'
        };
    };
});

