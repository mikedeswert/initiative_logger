module.exports = {
    injector: {
        options: {
            destFile: 'index.html',
            bowerPrefix: 'bower',
            addRootSlash: false
        },
        files: {
            'index.html': ['js/**/*.js', 'css/**/*.css']
        }
    }
};