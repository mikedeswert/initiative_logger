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
            getBoardTemplates();
        };


        $scope.selectBoardTemplate = function() {
            $scope.selectedBoardTemplate = $scope.tempSelectedBoardTemplate;
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
                    $scope.openSelectBoardTemplate();
                }
            );
        };

        $scope.$watch('selectedBoardTemplate', function (newVal) {
            boardTemplateService.setSelectedBoardTemplate(newVal);
        });

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