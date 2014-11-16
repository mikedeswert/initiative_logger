module.exports = function(grunt) {
    var protractor = require('./config/protractor'),
        less = require('./config/less'),
        karma = require('./config/karma'),
        watch = require('./config/watch'),
        copy = require('./config/copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            server_home: grunt.option('server-home') || 'C:\\Tools\\apache-tomcat-8.0.3',
            project_name: grunt.option('project-name') ||  'initiative_roller'
        },
        protractor: protractor,
        less: less,
        karma: karma,
        copy: copy,
        watch: watch
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['copy', 'test-e2e-local']);
    grunt.registerTask('test-e2e', ['protractor:test']);
    grunt.registerTask('test-e2e-local', ['protractor:testLocal']);
};