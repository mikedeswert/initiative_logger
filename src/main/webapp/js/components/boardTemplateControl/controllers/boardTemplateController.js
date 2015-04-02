angular.module('boardTemplateControl')
    .controller('BoardTemplateController', ['$scope', 'webSocketService', 'boardTemplateService', function($scope, webSocketService, boardTemplateService) {
        $scope.selectedBoardTemplate;
        $scope.newBoardSize;
        $scope.tempSelectedBoardTemplate = newBoardTemplate();
        $scope.isEditBoardTemplateOpen = false;
        $scope.creatingBoardTemplate = false;
        $scope.boardTemplates = [];

        $scope.init = function() {
            webSocketService.subscribe('BoardTemplateController', function() {
                    getBoardTemplates();
                }
            );
            getBoardTemplates();
        };


        $scope.selectBoardTemplate = function() {
            $scope.selectedBoardTemplate = $scope.tempSelectedBoardTemplate;
            $scope.newBoardSize = $scope.selectedBoardTemplate.size;
            $scope.openEditBoardTemplate();
        };

        $scope.isTempBoardTemplateSelected = function() {
            return $scope.tempSelectedBoardTemplate != undefined;
        };

        $scope.isBoardTemplateSelected = function() {
            return boardTemplateService.isBoardTemplateSelected();
        };

        $scope.isSelectedBoardTemplateValid = function() {
            return boardTemplateService.isSelectedBoardTemplateValid();
        };

        $scope.openCreateBoardTemplate = function() {
            $scope.selectedBoardTemplate = newBoardTemplate();
            $scope.newBoardSize = $scope.selectedBoardTemplate.size;
            boardTemplateService.setSelectedBoardTemplate($scope.selectedBoardTemplate);
            $scope.creatingBoardTemplate = true;
            $scope.saveBoardTemplate().then(
                function() {
                    $scope.creatingBoardTemplate = false;
                    $scope.openEditBoardTemplate();
                }
            );
        };

        $scope.openEditBoardTemplate = function() {
            $scope.isEditBoardTemplateOpen = true;
        };

        $scope.saveBoardTemplate = function() {
            if(!$scope.creatingBoardTemplate) {
                return boardTemplateService.updateBoardTemplate();
            }

            return boardTemplateService.createBoardTemplate();
        };

        $scope.openSelectBoardTemplate = function() {
            $scope.isEditBoardTemplateOpen = false;
        };

        $scope.deleteBoardTemplate = function() {
            //TODO add confirmation dialog
            boardTemplateService.deleteBoardTemplate().then(
                function() {
                    $scope.tempSelectedBoardTemplate = newBoardTemplate();
                    $scope.selectedBoardTemplate = undefined;
                    $scope.openSelectBoardTemplate();
                }
            );
        };

        $scope.$watch('selectedBoardTemplate', function (newVal) {
            boardTemplateService.setSelectedBoardTemplate(newVal);
        });

        $scope.resizeBoard = function() {
            resizeBoard($scope.selectedBoardTemplate);
        };

        function resizeBoard() {
            var tilesCopy = copyTiles();
            resizeRows(tilesCopy);
            tilesCopy.forEach(function(row) {
                resizeColumns(row);
            });

            $scope.selectedBoardTemplate.tiles = tilesCopy;
            $scope.selectedBoardTemplate.size = $scope.newBoardSize;
        }

        function copyTiles() {
            var tilesCopy = [];

            $scope.selectedBoardTemplate.tiles.forEach(function(row) {
                tilesCopy.push(row.slice());
            });

            return tilesCopy;
        }

        function resizeRows(tiles) {
            if(tiles.length > $scope.newBoardSize) {
                tiles.length = $scope.newBoardSize;
                return;
            }

            for(var i = tiles.length; i < $scope.newBoardSize; i++) {
                tiles.push(createRow());
            }
        }

        function createRow() {
            var row = [];

            for(var i = 0; i < $scope.newBoardSize; i++) {
                row.push({
                    orientation: "NORTH",
                    tokens: [],
                    type: $scope.selectedBoardTemplate.defaultTileType
                })
            }

            return row;
        }

        function resizeColumns(row) {
            if(row.length > $scope.newBoardSize) {
                row.length = $scope.newBoardSize;
                return;
            }

            for(var i = row.length; i < $scope.newBoardSize; i++) {
                row.push({
                    orientation: "NORTH",
                    tokens: [],
                    type: $scope.selectedBoardTemplate.defaultTileType
                })
            }
        }

        function getBoardTemplates() {
            boardTemplateService.getBoardTemplates().then(
                function(boardTemplates) {
                    $scope.boardTemplates = boardTemplates;
                    if($scope.boardTemplates.length > 0) {
                        $scope.tempSelectedBoardTemplate = $scope.boardTemplates[0];
                    }
                }
            )
        }

        function newBoardTemplate() {
            return { name: "New board", size: 10 };
        }
    }]);