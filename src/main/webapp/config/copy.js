module.exports = {
    main: {
        expand: true,
        cwd: './',
        src: ["js/**/*.js", "css/**/*.css", "index.html" ,"templates/**/*.html"],
        dest: "<%=config.server_home%>\\webapps\\<%=config.project_name%>"
    }
};