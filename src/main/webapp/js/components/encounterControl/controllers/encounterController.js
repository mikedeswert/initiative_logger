angular.module('encounterControl')
    .controller('EncounterController', ['$scope', 'webSocketService', 'encounterService', function ($scope, webSocketService, encounterService) {
        $scope.encounters = [];
        $scope.initialized = false;
        $scope.isCreateEncounterOpen = false;
        $scope.isUpdateEncounterOpen = false;
        $scope.selectedEncounter;
        $scope.newEncounter = {name: ''};
        $scope.encounterToUpdate = {name: ''};

        $scope.init = function () {
            webSocketService.subscribe('EncounterController', getEncounters);
            getEncounters();
        };

        $scope.createEncounter = function () {
            if (encounterService.isEncounterValid($scope.newEncounter)) {
                encounterService.createEncounter($scope.newEncounter).then(
                    function () {
                        $scope.closeCreateEncounter();
                    }
                );
            }
        };

        $scope.updateEncounter = function () {
            if (encounterService.isEncounterValid($scope.encounterToUpdate)) {
                encounterService.updateEncounter($scope.encounterToUpdate).then(
                    function () {
                        $scope.closeUpdateEncounter();
                    }
                );
            }
        };

        $scope.selectEncounterToUpdate = function () {
            $scope.encounterToUpdate = angular.copy($scope.selectedEncounter);
            $scope.isUpdateEncounterOpen = true;
        };

        $scope.openCreateEncounterView = function () {
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

        $scope.$watch('selectedEncounter', function (newVal, oldVal) {
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
            }).finally(function () {
                $scope.initialized = true;
            });
        }
    }]);