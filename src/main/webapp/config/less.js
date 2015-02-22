module.exports = {
    development: {
        options: {
            compress: true,
            yuicompress: true,
            optimization: 2
        },
        files: {
            "css/main.css": "less/main.less",
            "css/board.css": "less/board.less",
            "css/tileEditor.css": "less/components/tileEditor.less",
            "css/webSocketStatusView.css": "less/components/webSocketStatusView.less"
        }
    }
};