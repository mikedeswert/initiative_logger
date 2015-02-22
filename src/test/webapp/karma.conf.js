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
            'main/webapp/bower_components/angular/angular.min.js',
            'main/webapp/bower_components/angular-route/angular-route.min.js',
            'test/webapp/lib/angular-mocks/angular-mocks.js',
            'main/webapp/bower_components/mockito4js/src/main/mockito4.js',
            {pattern: 'main/webapp/bower_components/**/*.js', included: false},
            'main/webapp/js/**/*.js',
            'test/webapp/unit/**/*.js'
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
