"use strict";

angular.module('initiativeRollerModule')
    .controller('BoardController', ['$scope', 'boardService', 'messageService', 'pageService', 'webSocketService', 'creatureService', 'tokenFactory', function ($scope, boardService, messageService, pageService, webSocketService, creatureService, tokenFactory) {
        $scope.pageService = pageService;
        $scope.creatures = [];
        $scope.isCreatureTokenListOpen = false;

        $scope.board = {};
        $scope.scale = 1;

        $scope.init = function () {
            webSocketService.subscribe('BoardController', getBoard);

            messageService.clearMessages();
            getBoard();
        };

        $scope.onCreatureDragComplete = function (data, event) {

            var cell = event.currentScope.cell;

            if (typeof cell != 'undefined' && cell != null) {
                cell.tokens.push(createCreatureToken(cell, data));
                boardService.updateBoard($scope.board);
            }
        };

        $scope.onTokenDragComplete = function (data, event) {

            var cell = event.currentScope.cell;

            if (typeof cell != 'undefined' && cell != null) {
                removeToken(data);
                cell.tokens.push(data);
                boardService.updateBoard($scope.board);
            }
        };

        $scope.getCellClassNames = function (cellIndex, rowIndex) {
            return "tile " + $scope.board.tiles[rowIndex][cellIndex].type.toLowerCase();
        };

        function getCreatures() {
            creatureService.getCreatures().then(function (creatures) {
                $scope.creatures = creatures.filter(function (creature) {
                    return boardDoesNotContainCreature(creature);
                });
            });
        }

        function getBoard() {
            boardService.getBoard().then(function (board) {
                    $scope.board = board;
                    getCreatures();
                }
            );
        }

        function createCreatureToken(cell, creature) {
            var positionX = 0;
            var positionY = 0;

            for (var i = 0; i < $scope.board.tiles.length; i++) {
                var index = $scope.board.tiles[0].indexOf(cell);
                if (index != -1) {
                    positionX = index;
                    positionY = i;
                }
            }

            return tokenFactory.createCreatureToken(positionX, positionY, creature);
        }

        function removeToken(token) {
            for (var i = 0; i < $scope.board.tiles.length; i++) {
                for (var j = 0; j < $scope.board.tiles.length; j++) {
                    var index = $scope.board.tiles[i][j].tokens.indexOf(token);
                    if (index != -1) {
                        $scope.board.tiles[i][j].tokens.splice(index, 1);
                    }
                }
            }
        }

        function boardDoesNotContainCreature(creature) {
            for (var i = 0; i < $scope.board.tiles.length; i++) {

                var cells = $scope.board.tiles[i];
                for (var j = 0; j < cells.length; j++) {

                    var tokens = cells[j].tokens;
                    for (var k = 0; k < tokens.length; k++) {
                        if (typeof tokens[k].creature != '' && tokens[k].creature != null && tokens[k].creature.id == creature.id) {
                            return false;
                        }
                    }
                }
            }

            return true;
        }
    }]);