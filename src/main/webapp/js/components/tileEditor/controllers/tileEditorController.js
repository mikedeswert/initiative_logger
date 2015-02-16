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

            if(isTileTypeSelected()) {
                classNames += ' selected';
            }

            return classNames
        };

        $scope.isOrientationSelected = function(orientation) {
            return isTileSelected() && $scope.selectedTile.orientation == orientation;
        };

        $scope.setSelectedTileOrientation = function(orientation) {
            if(isTileSelected()) {
                tileEditorService.getSelectedTile().orientation = orientation;
            }
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
            if($scope.selectedTile != undefined && $scope.selectedTile != null) {
                messageService.clearMessages();
                return true;
            }

            messageService.addWarningMessage('No tile selected');
            return false;
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