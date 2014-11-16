module.exports = {
    styles: {
        files: ['less/**/*.less'],
        tasks: ['less', 'deploy'],
        options: {
            nospawn: true
        }
    },
    js: {
        files: ['js/**/*.js'],
        tasks: ['karma', 'deploy']
    },
    markup: {
        files: ['**/*.html'],
        tasks: ['deploy']
    },
    unit: {
        files: ['../../test/webapp/unit/**/*.js'],
        tasks: ['karma']
    }
};