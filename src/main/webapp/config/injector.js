module.exports = {
    injector: {
        options: {
            destFile: 'index.html',
            bowerPrefix: 'bower',
            relative: true
        },
        files: {
            'index.html': ['js/**/*.js', 'css/**/*.css']
        }
    }
};