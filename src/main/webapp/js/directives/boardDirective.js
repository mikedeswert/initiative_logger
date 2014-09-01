angular.module('directivesModule').directive('board', function () {
    function scale() {

    }

    function getClassNames(y, x, boardSize) {
        var classNames = "tile";

        if(y == 0) {
            classNames += " top";
        }

        if(x == 0) {
            classNames += " right";
        }

        if(y+1 == boardSize) {
            classNames += " bottom";
        }

        if(x+1 == boardSize) {
            classNames += " right";
        }

        return classNames;
    }

    return function (scope, elem, attr) {
        scope.$watch('board', function() {
            var board = scope.board;
            var boardContainer = elem[0];
            var boardWidth = elem[0].offsetWidth;
            boardContainer.setAttribute("style","width:" + boardWidth + "px;" +
                "height:" + boardWidth + "px;" +
                "display:block;");

            for(var y = 0; y < board.size; y++) {
                var rowElement = document.createElement("div");
                rowElement.setAttribute("style", "width: " + boardWidth + "px;" +
                    "height: " + boardWidth / board.size + "px;");
                for(var x = 0; x < board.size; x++) {
                    var tileElement = document.createElement("div");
                    tileElement.setAttribute("style", "width: " + boardWidth / board.size + "px;" +
                        "height: " + boardWidth / board.size + "px;");

                    var classNames = getClassNames(y, x, board.size);
                    classNames += " " + board.tiles[x][y].type.toLowerCase();
                    tileElement.setAttribute("class", classNames);

                    rowElement.appendChild(tileElement);
                }
                boardContainer.appendChild(rowElement);
            }
        })
    }

});