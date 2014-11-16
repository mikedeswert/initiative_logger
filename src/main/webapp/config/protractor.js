module.exports = {
    options: {
        configFile: 'node_modules/protractor/referenceConf.js',
        keepAlive: true,
        args: {}
    },
    test: {
        configFile: '../../test/webapp/e2e.conf.js',
        options: {
            args: {}
        }
    },
    testLocal: {
        configFile: '../../test/webapp/e2e.local.conf.js',
        options: {
            args: {}
        }
    }
};