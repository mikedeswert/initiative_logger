module.exports = function (config) {
    config.set({
        basePath: '../../',
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],
        frameworks: ['jasmine'],
        files: [
            // External dev dependencies
            'main/webapp/bower_components/angular/angular.min.js',
            'main/webapp/bower_components/angular-animate/angular-animate.min.js',
            'main/webapp/bower_components/angular-bootstrap/ui-bootstrap.min.js',
            'main/webapp/bower_components/angular-panhandler/dist/angular-panhandler.min.js',
            'main/webapp/bower_components/angular-route/angular-route.min.js',
            'main/webapp/bower_components/angular-touch/angular-touch.min.js',
            'main/webapp/bower_components/ngDraggable/ngDraggable.js',
            'main/webapp/bower_components/sockjs/sockjs.min.js',
            'main/webapp/bower_components/stomp.min/index.js',
            // External test dependencies
            'test/webapp/lib/angular-mocks/angular-mocks.js',
            'main/webapp/bower_components/mockito4js/dist/mockito4.js',
            // Internal files
            'main/webapp/js/app.js',
            'main/webapp/js/**/*.js',
            'test/webapp/unit/**/*.js',
            {pattern: 'main/webapp/bower_components/**/*.js', included: false}
        ],
        reporters: ['progress'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        port: 9010,
        colors: true,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
