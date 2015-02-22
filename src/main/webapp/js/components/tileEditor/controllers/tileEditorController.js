angular.module('tileEditor')
    .controller('TileEditorController', ['$scope', 'webSocketService', 'tileEditorService', 'messageService', function ($scope, webSocketService, tileEditorService, messageService) {
        $scope.tileTypes = [];
        $scope.orientations = [];
        $scope.selectedTile;
        $scope.tileTypeSearchTerm = '';

        $scope.init = function () {
            webSocketService.subscribe('TileEditorController', updateTileTypes);

            updateTileTypes();
            getOrientations();
        };

        $scope.getTileClassNames = function(tileType) {
            var classNames = tileType.toLowerCase();

            if(isTileTypeSelected(tileType)) {
                classNames += ' selected';
            }

            return classNames
        };

        $scope.isOrientationSelected = function(orientation) {
            return isTileSelected() && $scope.selectedTile.orientation == orientation;
        };

        $scope.setSelectedTileOrientation = function(orientation) {
            if(!isTileSelected()) {
                messageService.addWarningMessage('No tile selected');
                return;
            }

            messageService.clearMessages();
            tileEditorService.getSelectedTile().orientation = orientation;
        };

        $scope.setSelectedTileType = function(type) {
            if(!isTileSelected) {
                messageService.addWarningMessage('No tile selected');
                return;
            }

            messageService.clearMessages();
            tileEditorService.getSelectedTile().type = type;
        };

        $scope.$watch(
            function() {
                return tileEditorService.getSelectedTile();
            },
            function(newVal) {
                $scope.selectedTile = newVal;
            }
        );

        function isTileSelected() {
            return $scope.selectedTile != undefined && $scope.selectedTile != null;
        }

        function updateTileTypes() {
            tileEditorService.getTileTypes().then(
                function(tileTypes) {
                    $scope.tileTypes = tileTypes;
                }
            );
        }

        function getOrientations() {
            tileEditorService.getOrientations().then(
                function(orientations) {
                    $scope.orientations = orientations;
                }
            );
        }

        function isTileTypeSelected(tileType) {
            return isTileSelected() && $scope.selectedTile.type == tileType;
        }
    }]);