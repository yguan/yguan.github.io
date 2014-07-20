/*global require */

require.config({
    baseUrl: 'app',
    paths: {
        lib: 'lib',
        revealLib: '../lib',
        revealJs: '../js',
        presentations: 'presentations'
    }
});

require([
    'lib/text',
    'lib/jquery',
    'revealLib/js/head.min',
    'revealJs/reveal.min'
], function () {
    'use strict';

    require(['presentations/all'], function (presentations) {
        presentations.render('body');
    });
});
