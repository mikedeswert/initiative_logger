angular.module('boardEditor')
    .controller('BoardEditorController', ['$scope', 'tileEditorService', 'boardTemplateService', function ($scope, tileEditorService, boardTemplateService) {
        $scope.selectedTile;
        $scope.board;

        $scope.init = function() {
            getSelectedBoardTemplate();
        };

        $scope.isBoardTemplateSelected = function() {
            return boardTemplateService.isBoardTemplateSelected();
        };

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
            var cellNames = 'tile ' + cell.type.toLowerCase() + ' ' + cell.orientation.toLowerCase();

            if($scope.isSelected(cell)) {
                cellNames += ' selected';
            }

            return cellNames;
        };

        $scope.$watch(
            function() {
                return boardTemplateService.getSelectedBoardTemplate();
            },
            function() {
                getSelectedBoardTemplate();
            }
        );

        $scope.$watch('board', function(newVal) {
            boardTemplateService.setSelectedBoardTemplate(newVal);
        });

        $scope.$watch(
            function () {
                return tileEditorService.getSelectedTile()
            },
            function (newVal) {
                $scope.selectedTile = newVal;
            }
        );

        function getSelectedBoardTemplate() {
            $scope.board = boardTemplateService.getSelectedBoardTemplate();
        }
    }]);