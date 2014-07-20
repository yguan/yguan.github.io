/*jslint nomen: true*/
/*global define,require*/

define(function (require, exports) {
    'use strict';

    var templateMap = require('presentations/template-map');
    var util = require('lib/util');
    var templateData = templateMap.getTemplateData(util.getQueryParameter('name'));

    exports.render = function (container) {
        require(['lib/text!presentations/' + templateData.name], function (template) {
            var $container = $(container);
            $container.append(template);
            $('title').text(templateData.title);
            require(['reveal-init']);
        });
    };
});