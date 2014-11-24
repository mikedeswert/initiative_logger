"use strict";

angular.module('directivesModule').directive('board', ['$compile', function ($compile) {
    function scale() {

    }

    function getClassNames(y, x, boardSize) {
        var classNames = "tile";

        if (y == 0) {
            classNames += " top";
        }

        if (x == 0) {
            classNames += " right";
        }

        if (y + 1 == boardSize) {
            classNames += " bottom";
        }

        if (x + 1 == boardSize) {
            classNames += " right";
        }

        return classNames;
    }

    function createTileElement(board, boardWidth, x, y) {
        var tileElement = document.createElement("div");
        tileElement.setAttribute("style", "width: " + boardWidth / board.size + "px;" +
        "height: " + boardWidth / board.size + "px;");

        tileElement.setAttribute("ng-drop", "true");
        tileElement.setAttribute("ng-drop-success", "onDropComplete($data, $event)");

        var classNames = getClassNames(y, x, board.size);
        classNames += " " + board.tiles[x][y].type.toLowerCase();
        tileElement.setAttribute("class", classNames);

        return tileElement;
    }

    return function (scope, elem, attr) {
        var boardContainer = elem[0];

        /*        scope.$watch('board', function () {
         var boardWidth = elem[0].offsetWidth;
         boardContainer.setAttribute("style", "width:" + boardWidth + "px;" +
         "height:" + boardWidth + "px;" +
         "display:block;");
         });*/

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
        /*  scope.$watch('board', function () {
         var boardWidth =
         elem[0].setAttribute("style", "width: " + boardWidth + "px;" +
         "height: " + boardWidth / scope.board.size + "px;");
         });*/
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
        /*        scope.$watch('board', function () {
         var boardWidth = elem[0].parentNode.parentNode.offsetWidth;
         elem[0].setAttribute("style", "width: " + boardWidth / scope.board.size + "px;" +
         "height: " + boardWidth / scope.board.size + "px;");
         });*/

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
                return elem[0].parentNode.parentNode.parentNode.offsetWidth;
            },
            function (newVal, oldVal) {
                var boardWidth = elem[0].parentNode.parentNode.parentNode.offsetWidth;
                elem[0].setAttribute("style", "max-width: " + (boardWidth / scope.board.size * 0.80) + "px;");
                elem[0].setAttribute("height", (boardWidth / scope.board.size * 0.80) + "px;");
            }
        )
    }

});