"use strict";

angular.module('initiativeRollerModule')
    .controller('BoardController', ['$scope', 'encounterService', 'boardService', 'messageService', 'pageService', 'webSocketService', 'creatureService', 'tokenFactory', function ($scope, encounterService, boardService, messageService, pageService, webSocketService, creatureService, tokenFactory) {
        $scope.pageService = pageService;
        $scope.creatures = [];
        $scope.isCreatureTokenListOpen = false;
        $scope.selectedEncounter;

        $scope.scale = 1;

        $scope.init = function () {
            webSocketService.subscribe('BoardController', updateSelectedEncounter);

            messageService.clearMessages();
            updateSelectedEncounter();
        };

        $scope.onCreatureDragComplete = function (data, event) {

            var cell = event.currentScope.cell;

            if (typeof cell != 'undefined' && cell != null) {
                cell.tokens.push(createCreatureToken(cell, data));
                boardService.updateBoard($scope.selectedEncounter.board);
            }
        };

        $scope.onTokenDragComplete = function (data, event) {

            var cell = event.currentScope.cell;

            if (typeof cell != 'undefined' && cell != null) {
                removeToken(data);
                cell.tokens.push(data);
                boardService.updateBoard($scope.selectedEncounter.board);
            }
        };

        $scope.getCellClassNames = function (cellIndex, rowIndex) {
            return "tile " + $scope.selectedEncounter.board.tiles[rowIndex][cellIndex].type.toLowerCase();
        };

        $scope.isEncounterSelected = function() {
            return encounterService.isEncounterSelected();
        };

        $scope.$watch('selectedEncounter', function (newVal, oldVal) {
            if ($scope.initialized) {
                encounterService.setSelectedEncounter(newVal);
            }
        });

        $scope.$watch(
            function () {
                return encounterService.getSelectedEncounter();
            },
            updateSelectedEncounter
        );

        function updateSelectedEncounter() {
            $scope.selectedEncounter = encounterService.getSelectedEncounter();
            $scope.creatures = $scope.selectedEncounter.creatures.filter(function (creature) {
                return boardDoesNotContainCreature(creature);
            });
        }

        function createCreatureToken(cell, creature) {
            var positionX = 0;
            var positionY = 0;

            for (var i = 0; i < $scope.selectedEncounter.board.tiles.length; i++) {
                var index = $scope.selectedEncounter.board.tiles[0].indexOf(cell);
                if (index != -1) {
                    positionX = index;
                    positionY = i;
                }
            }

            return tokenFactory.createCreatureToken(positionX, positionY, creature);
        }

        function removeToken(token) {
            var tile = $scope.selectedEncounter.board.tiles[token.positionY][token.positionX];
            if (tile.tokens.indexOf(token) != -1) {
                tile.tokens.splice(index, 1);
            }
        }

        function boardDoesNotContainCreature(creature) {
            for (var i = 0; i < $scope.selectedEncounter.board.tiles.length; i++) {

                var cells = $scope.selectedEncounter.board.tiles[i];
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