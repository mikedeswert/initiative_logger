"use strict";

angular.module('initiativeRollerModule')
    .controller('BoardController', ['$scope', 'restService', 'messageService', 'pageService', 'webSocketService', 'creatureService', function($scope, restService, messageService, pageService, webSocketService, creatureService) {
        $scope.creatures = [];
        $scope.pageService = pageService;
        $scope.board = {};
        $scope.isCreatureTokenListOpen = false;

        $scope.init = function() {
            webSocketService.subscribe('BoardController', function() {
                getCreatures();
                getBoard();

            });

            messageService.clearMessages();
            getCreatures();
            getBoard();
        };

        $scope.onDragComplete = function(data, event) {

            var cell = event.currentScope.cell;

            if(typeof cell != 'undefined' && cell != null) {
                cell.tokens.push(data);
            }
        };

        $scope.getCellClassNames = function(cellIndex, rowIndex) {
            var classNames = "tile " + $scope.board.tiles[rowIndex][cellIndex].type.toLowerCase();

            if(rowIndex == 0) {
                classNames += " top";
            }

            if(cellIndex == 0) {
                classNames += " left";
            }

            if(rowIndex+1 == $scope.board.size) {
                classNames += " bottom";
            }

            if(cellIndex+1 == $scope.board.size) {
                classNames += " right";
            }

            return classNames;
        };


        function getCreatures() {
            creatureService.getCreatures().then(function(creatures) {
                $scope.creatures = creatures;
            });
        }

        function getBoard() {
            restService.get('/rest/board/')
                .then(
                function(response) {
                    $scope.board = response.data;
                },
                function() {
                    messageService.addErrorMessage('Something went wrong while retrieving the board. Please refresh the page to try again.');
                }
            );
        }
    }]);