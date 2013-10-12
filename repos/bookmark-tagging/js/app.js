require.config({
    baseUrl: 'js',
    paths: {
        lib: './lib',
        data: './data',
        view: './view',
        extension: './extension'
    }
});

require([
    'lib/lodash.underscore',
    'lib/jquery',
    'lib/bootstrap/bootstrap',
    'lib/angular/angular',
    'lib/angular/ui-bootstrap-tpls',
    'lib/angular/bootstrap-tagsinput',
    'lib/angular/bootstrap-tagsinput-angular',
    'lib/angular/ng-grid',
    'lib/angular/angular-file-upload',
    'lib/angular/styling',
    'extension/lodash.underscore'
], function() {
    require([

        'data/bookmark-loader',
        'view/all-views'
    ], function(loader, views) {
        loader.init({
            success: views.init,
            failure: views.init
        });
    });
});

// python -m http.server
