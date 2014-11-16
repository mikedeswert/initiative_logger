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
            'main/webapp/js/lib/angular-1.3.0-beta.18/angular.min.js',
            'main/webapp/js/lib/angular-1.3.0-beta.18/angular-route.min.js',
            'test/webapp/lib/angular-mocks/angular-mocks.js',
            {pattern: 'main/webapp/js/lib/**/*.js', included: false},
            'main/webapp/js/**/*.js',
            'test/webapp/unit/**/*.js'
        ],
        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        port: 9010,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
