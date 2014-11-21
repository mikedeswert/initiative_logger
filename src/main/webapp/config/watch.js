module.exports = {
    styles: {
        files: ['less/**/*.less'],
        tasks: ['less', 'deploy', 'test-e2e-local'],
        options: {
            nospawn: true
        }
    },
    js: {
        files: ['js/**/*.js'],
        tasks: ['karma', 'deploy', 'test-e2e-local']
    },
    markup: {
        files: ['**/*.html'],
        tasks: ['deploy', 'test-e2e-local']
    },
    unit: {
        files: ['../../test/webapp/unit/**/*.js'],
        tasks: ['karma']
    }
};