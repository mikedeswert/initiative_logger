"use strict";

angular.module('pageModule')
    .controller('BoardPageController', ['$scope', 'encounterService', 'boardService', 'messageService', 'pageService', 'webSocketService', 'creatureService', 'tokenFactory', function ($scope, encounterService, boardService, messageService, pageService, webSocketService, creatureService, tokenFactory) {
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
                var token = tokenFactory.createCreatureToken(data);
                cell.tokens.push(token);

                var position = retrieveCreaturePosition(token.creature);
                token.positionX = position.x;
                token.positionY = position.y;

                boardService.updateBoard($scope.selectedEncounter.board);
            }
        };

        $scope.onTokenDragComplete = function (data, event) {

            var cell = event.currentScope.cell;

            if (typeof cell != 'undefined' && cell != null) {
                removeToken(data);
                cell.tokens.push(data);
                var position = retrieveCreaturePosition(data.creature);
                data.positionX = position.x;
                data.positionY = position.y;

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
            if(typeof $scope.selectedEncounter != 'undefined' || $scope.selectedEncounter != null) {
                $scope.creatures = $scope.selectedEncounter.creatures.filter(function (creature) {
                    return boardDoesNotContainCreature(creature);
                });
            }
        }

        function retrieveCreaturePosition(creature) {
            var position = {x: -1, y:-1};

            for (var i = 0; i < $scope.selectedEncounter.board.tiles.length; i++) {

                var cells = $scope.selectedEncounter.board.tiles[i];
                for (var j = 0; j < cells.length; j++) {

                    var tokens = cells[j].tokens;
                    for (var k = 0; k < tokens.length; k++) {
                        if (typeof tokens[k].creature != '' && tokens[k].creature != null && tokens[k].creature.id == creature.id) {
                            position.x = j;
                            position.y = i;
                        }
                    }
                }
            }

            return position;
        }

        function removeToken(token) {
            var tile = $scope.selectedEncounter.board.tiles[token.positionY][token.positionX];
            var index = tile.tokens.indexOf(token);
            if (index != -1) {
                tile.tokens.splice(index, 1);
            }
        }

        function boardDoesNotContainCreature(creature) {
            var position = retrieveCreaturePosition(creature);
            return position.x == -1 && position.y == -1;
        }

        $scope.toggleBloodied = function(creature) {
            creature.bloodied = !creature.bloodied;
            creatureService.updateCreature(creature);
        };

        $scope.deleteToken = function(token) {
            removeToken(token);
        };

        $scope.tokenControlTemplate = '<button data-ng-click="toggleBloodied(\'token.creature\'" class="btn btn-primary">Bloodied</button>' +
                                      '<button data-ng-click="deleteToken(\'token\'" class="btn btn-danger">Delete</button>'
    }]);