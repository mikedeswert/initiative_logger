angular.module('boardTemplateControl')
    .controller('BoardTemplateController', ['$scope', 'webSocketService', 'boardTemplateService', function($scope, webSocketService, boardTemplateService) {
        $scope.selectedBoardTemplate = newBoardTemplate();
        $scope.tempSelectedBoardTemplate = newBoardTemplate();
        $scope.isEditBoardTemplateOpen = false;
        $scope.creatingBoardTemplate = false;
        $scope.boardTemplates = [];

        $scope.init = function() {
            webSocketService.subscribe('BoardTemplateController', function() {
                    getBoardTemplates();
                }
            );
        };


        $scope.selectBoardTemplate = function() {
            //TODO add confirmation dialog
            $scope.selectedBoardTemplate = $scope.tempSelectedBoardTemplate;
            $scope.openEditBoardTemplate();
        };

        $scope.isTempBoardTemplateSelected = function() {
            return $scope.tempSelectedBoardTemplate != undefined && $scope.tempSelectedBoardTemplate.name != '';
        };

        $scope.isBoardTemplateSelected = function() {
            return $scope.selectedBoardTemplate != undefined && $scope.selectedBoardTemplate.name != '';
        };

        $scope.openCreateBoardTemplate = function() {
            //TODO add confirmation dialog
            $scope.selectedBoardTemplate = newBoardTemplate();
            $scope.boardTemplates.push($scope.selectedBoardTemplate);
            $scope.creatingBoardTemplate = true;
            $scope.openEditBoardTemplate();
        };

        $scope.openEditBoardTemplate = function() {
            $scope.isEditBoardTemplateOpen = true;
        };

        $scope.saveBoardTemplate = function() {
            if(!$scope.creatingBoardTemplate) {
                boardTemplateService.updateBoardTemplate();
                return;
            }

            boardTemplateService.createBoardTemplate().then(
                function() {
                    $scope.creatingBoardTemplate = false;
                }
            );
        };

        $scope.openSelectBoardTemplate = function() {
            $scope.isEditBoardTemplateOpen = false;
        };

        $scope.deleteBoardTemplate = function() {
            //TODO add confirmation dialog
            boardTemplateService.deleteBoardTemplate().then(
                function() {
                    $scope.tempSelectedBoardTemplate = newBoardTemplate();
                    $scope.openSelectBoardTemplate();
                }
            );
        };

        $scope.$watch('selectedBoardTemplate', function (newVal) {
            if ($scope.initialized) {
                boardTemplateService.setSelectedBoardTemplate(newVal);
            }
        });

        function getBoardTemplates() {
            boardTemplateService.getBoardTemplates().then(
                function(boardTemplates) {
                    $scope.boardTemplates = boardTemplates;
                }
            )
        }

        function newBoardTemplate() {
            return { name: ""};
        }
    }]);