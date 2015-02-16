module.exports = {
    main: {
        expand: true,
        cwd: './',
        src: ["js/**/*.js", "css/**/*.css", "index.html" ,"templates/**/*.html", "bower_components/**/*.js"],
        dest: "<%=config.server_home%>\\webapps\\<%=config.project_name%>"
    }
};