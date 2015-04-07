angular.module('encounterControl')
    .controller('EncounterController', ['$scope', 'webSocketService', 'encounterService', 'boardTemplateService', function ($scope, webSocketService, encounterService, boardTemplateService) {
        $scope.encounters = [];
        $scope.initialized = false;
        $scope.isCreateEncounterOpen = false;
        $scope.isUpdateEncounterOpen = false;
        $scope.selectedEncounter;
        $scope.selectedBoardTemplateId;
        $scope.newEncounter = {name: ''};
        $scope.encounterToUpdate = {name: ''};

        $scope.boardTemplates = [];

        $scope.init = function () {
            webSocketService.subscribe('EncounterController', function() {
                    getBoards();
                    getEncounters();
                }
            );
            getBoards();
            getEncounters();
        };

        $scope.createEncounter = function () {
            if (encounterService.isEncounterValid($scope.newEncounter)) {
                encounterService.createEncounter($scope.newEncounter, $scope.selectedBoardTemplateId).then(
                    function () {
                        $scope.closeCreateEncounter();
                    }
                );
            }
        };

        $scope.updateEncounter = function () {
            if (encounterService.isEncounterValid($scope.encounterToUpdate)) {
                encounterService.updateEncounter($scope.encounterToUpdate, $scope.selectedBoardTemplateId).then(
                    function () {
                        $scope.closeUpdateEncounter();
                    }
                );
            }
        };

        $scope.selectEncounterToUpdate = function () {
            $scope.encounterToUpdate = angular.copy($scope.selectedEncounter);
            $scope.selectedBoardTemplateId = $scope.encounterToUpdate.board.boardTemplate.id;
            $scope.isUpdateEncounterOpen = true;
        };

        $scope.openCreateEncounterView = function () {
            $scope.selectedBoardTemplateId = undefined;
            $scope.isCreateEncounterOpen = true;
        };

        $scope.closeCreateEncounter = function () {
            $scope.newEncounter = {name: ''};
            $scope.isCreateEncounterOpen = false;
        };

        $scope.closeUpdateEncounter = function () {
            $scope.encounterToUpdate = {name: ''};
            $scope.isUpdateEncounterOpen = false;
        };

        $scope.isEncounterSelected = function() {
            return encounterService.isEncounterSelected();
        };

        $scope.$watch('selectedEncounter', function (newVal) {
            if ($scope.initialized) {
                encounterService.setSelectedEncounter(newVal);
            }
        });

        $scope.$watch(
            function () {
                return encounterService.getSelectedEncounter();
            },
            function () {
                $scope.selectedEncounter = getEncounter(encounterService.getSelectedEncounter());
            }
        );

        function getEncounter(encounter) {
            if (typeof encounter != 'undefined' && encounter != null) {
                for (var i = 0; i < $scope.encounters.length; i++) {
                    if ($scope.encounters[i].id == encounter.id) {
                        return $scope.encounters[i];
                    }
                }
            }

            return encounter;
        }

        function getEncounters() {
            encounterService.getEncounters().then(function (encounters) {
                $scope.encounters = encounters;
                $scope.selectedEncounter = getEncounter(encounterService.getSelectedEncounter());
                $scope.selectedBoardTemplateId = ($scope.selectedEncounter) ? $scope.selectedEncounter.board.boardTemplate.id : undefined;
            }).finally(function () {
                $scope.initialized = true;
            });
        }

        function getBoards() {
            boardTemplateService.getBoardTemplates().then(function (boardTemplates) {
                $scope.boardTemplates = boardTemplates;
            });
        }
    }]);