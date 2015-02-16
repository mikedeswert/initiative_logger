angular.module('boardEditor')
    .controller('BoardEditorController', ['$scope', 'tileEditorService', function ($scope, tileEditorService) {
        $scope.board = {
            size: 2,
            tiles: [
                [
                    {type: 'GRASS'}, {type: 'GRASS'}
                ],
                [
                    {type: 'GRASS'}, {type: 'GRASS'}
                ]
            ]
        };

        $scope.selectedTile;

        $scope.setSelectedTile = function (newSelectedTile) {
            tileEditorService.setSelectedTile(newSelectedTile);
        };

        $scope.isSelected = function(tile) {
            if($scope.selectedTile == undefined || $scope.selectedTile == null) {
                return false;
            }

            return $scope.selectedTile === tile;
        };

        $scope.getCellClassNames = function (cell) {
            var cellNames = 'tile ' + cell.type.toLowerCase();

            if($scope.isSelected(cell)) {
                cellNames += ' selected';
            }

            return cellNames;
        };

        $scope.$watch(
            function () {
                return tileEditorService.getSelectedTile()
            },
            function (newVal) {
                $scope.selectedTile = newVal;
            }
        )
    }]);