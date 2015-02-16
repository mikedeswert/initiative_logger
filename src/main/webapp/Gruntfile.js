module.exports = function(grunt) {
    var protractor = require('./config/protractor'),
        less = require('./config/less'),
        karma = require('./config/karma'),
        watch = require('./config/watch'),
        copy = require('./config/copy'),
        injector = require('./config/injector'),
        wiredep = require('./config/wiredep');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            server_home: grunt.option('server-home') || 'D:\\tools\\apache-tomcat-8.0.15',
            project_name: grunt.option('project-name') ||  'initiative_roller'
        },
        protractor: protractor,
        less: less,
        karma: karma,
        copy: copy,
        watch: watch,
        injector: injector,
        wiredep: wiredep
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['copy']);
    grunt.registerTask('index', ['injector', 'wiredep']);
    grunt.registerTask('test-e2e', ['protractor:test']);
    grunt.registerTask('test-e2e-local', ['protractor:testLocal']);
};