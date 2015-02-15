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
        scope.$watch(
            function () {
                return elem[0].parentNode.offsetWidth;
            },
            function (newVal, oldVal) {
                var boardWidth = elem[0].parentNode.offsetWidth;
                elem[0].setAttribute("style", "width: " + boardWidth + "px;" +
                "height: " + boardWidth / scope.board.size + "px;");
            }
        )
    }

}).directive('cell', function () {
    return function (scope, elem, attr) {
        scope.$watch(
            function () {
                return elem[0].parentNode.parentNode.offsetWidth;
            },
            function (newVal, oldVal) {
                var boardWidth = elem[0].parentNode.parentNode.offsetWidth;
                elem[0].setAttribute("style", "width: " + boardWidth / scope.board.size + "px;" +
                "height: " + boardWidth / scope.board.size + "px;" +
                "line-height: " + boardWidth / scope.board.size + "px;");
            }
        )
    }

}).directive('token', function () {
    return function (scope, elem, attr) {
        scope.$watch(
            function () {
                return elem[0].parentNode.parentNode.parentNode.parentNode.offsetWidth;
            },
            function (newVal, oldVal) {
                var boardWidth = elem[0].parentNode.parentNode.parentNode.parentNode.offsetWidth;
                elem[0].setAttribute("style", "max-width: " + (boardWidth / scope.board.size * 0.80) + "px;");
                elem[0].setAttribute("height", (boardWidth / scope.board.size * 0.80) + "px;");
            }
        )
    }

});