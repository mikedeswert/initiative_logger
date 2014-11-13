module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "css/main.css": "less/main.less",
                    "css/board.css": "less/board.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js', // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                args: {
                    // Arguments passed to the command
                }
            },
            test: {
                configFile: '../../test/webapp/e2e.conf.js', // Target-specific config file
                options: {
                    args: {} // Target-specific arguments
                }
            },
            testlocal: {
                configFile: '../../test/webapp/e2e.local.conf.js', // Target-specific config file
                options: {
                    args: {} // Target-specific arguments
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test-e2e', ['protractor:test']);
    grunt.registerTask('test-e2e-local', ['protractor:testLocal']);
};