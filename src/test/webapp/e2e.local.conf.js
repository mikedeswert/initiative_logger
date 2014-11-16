exports.config = {
    chromeOnly: true,
    baseUrl: 'http://localhost:9090/',
    capabilities: {
        'browserName': 'chrome'
    },

    specs: [
        'e2e/**/*.js'
    ],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};