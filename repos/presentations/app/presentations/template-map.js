/*jslint nomen: true*/
/*global define,require*/

define(function (require, exports) {
    'use strict';

    var templateMap = {
        'browser-automation': {
            name: 'browser-automation.tpl',
            title: 'In-Browser Automation'
        },
        'oscon-2014-experience': {
            name: 'oscon-2014-experience.tpl',
            title: 'OSCON 2014 Experience'
        },
        'oscon-2014-learning': {
            name: 'oscon-2014-learning.tpl',
            title: 'OSCON 2014 Learning'
        },
        'hadoop-spark': {
            name: 'hadoop-spark.tpl',
            title: 'Hadoop & Spark'
        }
    };

    exports.getTemplateData = function (name) {
        return templateMap[name] || {
            name: 'default.tpl',
            title: 'Yong Guan\'s Presentations'
        };
    };
});

