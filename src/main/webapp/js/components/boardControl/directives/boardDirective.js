"use strict";

angular.module('boardControl').directive('board', [function () {
    return function (scope, elem, attr) {
        var boardContainer = elem[0];

        scope.$watch(
            function () {
                return elem[0].offsetWidth;
            },
            function (newVal, oldVal) {
                if (newVal != oldVal) {
                    boardContainer.setAttribute("style", "width:" + newVal + "px;" +
                    "height:" + newVal + "px;" +
                    "display:block;");
                }
            }
        )
    }

}]).directive('row', function () {
    return function (scope, elem, attr) {
        function resizeRow() {
            var boardWidth = elem[0].parentNode.offsetWidth;
            elem[0].setAttribute("style", "width: " + boardWidth + "px;" +
            "height: " + boardWidth / scope.board.size + "px;");
        }

        scope.$watch(
            function () {
                return elem[0].parentNode.offsetWidth;
            },
            resizeRow
        );

        scope.$watch(
            function() {
                return scope.board.size;
            },
            resizeRow
        );
    }

}).directive('cell', function () {
    return function (scope, elem, attr) {
        function resizeCell() {
            var boardWidth = elem[0].parentNode.parentNode.offsetWidth;
            elem[0].setAttribute("style", "width: " + boardWidth / scope.board.size + "px;" +
            "height: " + boardWidth / scope.board.size + "px;" +
            "line-height: " + boardWidth / scope.board.size + "px;");
        }

        scope.$watch(
            function () {
                return elem[0].parentNode.parentNode.offsetWidth;
            },
            resizeCell
        );

        scope.$watch(
            function () {
                return scope.board.size;
            },
            resizeCell
        )
    }

}).directive('token', function () {
    return function (scope, elem, attr) {
        function resizeToken() {
            var boardWidth = elem[0].parentNode.parentNode.parentNode.parentNode.offsetWidth;
            elem[0].setAttribute("style", "max-width: " + (boardWidth / scope.board.size * 0.80) + "px;");
            elem[0].setAttribute("height", (boardWidth / scope.board.size * 0.80) + "px;");
        }

        scope.$watch(
            function () {
                return elem[0].parentNode.parentNode.parentNode.parentNode.offsetWidth;
            },
            resizeToken
        );

        scope.$watch(
            function () {
                return scope.board.size;
            },
            resizeToken
        );
    }

});