angular.module('initiativeRollerModule')
    .controller('AdminController', ['$scope', 'restService', 'messageService', 'pageService', 'creatureFactory', 'webSocketService', 'creatureService', 'encounterService', function($scope, restService, messageService, pageService, creatureFactory, webSocketService, creatureService, encounterService) {
        $scope.creatures = [];
        $scope.pageService = pageService;
        $scope.newCreature = creatureFactory.createDefaultCreature();;
        $scope.creatureToUpdate = creatureFactory.createDefaultCreature()
        $scope.isAddCreatureExpanded = true;
        $scope.isConsoleExpanded = true;
        $scope.isUpdateCreatureExpanded = true;
        $scope.isConsoleOpen = false;
        $scope.isUpdateOpen = false;
        $scope.isCreateEncounterOpen = false;
        $scope.isUpdateEncounterOpen = false;
        $scope.selectedEncounter;
        $scope.newEncounter = {name: ''};
        $scope.encounterToUpdate = {name: ''};
        $scope.encounters = [];

        $scope.init = function() {
            webSocketService.subscribe('AdminController', getEncounters);

            messageService.clearMessages();

            getEncounters();
            $scope.selectedEncounter = $scope.encounters[0];

            $scope.$broadcast('focusName');
        };

        $scope.createEncounter = function() {
            if(encounterService.isEncounterValid($scope.newEncounter)) {
                encounterService.createEncounter($scope.newEncounter).then(
                    function() {
                        $scope.closeCreateEncounter();
                    }
                );
            }
        };

        $scope.updateEncounter = function() {
            if(encounterService.isEncounterValid($scope.encounterToUpdate)) {
                encounterService.updateEncounter($scope.encounterToUpdate).then(
                    function() {
                        $scope.closeUpdateEncounter();
                    }
                );
            }
        };

        $scope.createCreature = function() {
            if(creatureService.isCreatureValid($scope.newCreature)) {
                if($scope.selectedEncounter.creatures == null) {
                    $scope.selectedEncounter.creatures = [];
                }

                $scope.selectedEncounter.creatures.push($scope.newCreature);
                encounterService.updateEncounter($scope.selectedEncounter).then(
                    function() {
                        $scope.newCreature = creatureFactory.createDefaultCreature();
                        $scope.$broadcast('focusName');
                    }
                );
            }
        };

        $scope.updateCreature = function() {
            if(creatureService.isCreatureValid($scope.creatureToUpdate)) {
                creatureService.updateCreature($scope.creatureToUpdate).then(
                    function() {
                        $scope.closeUpdate();
                        $scope.$broadcast('focusName');
                    }
                );
            }
        };

        $scope.deleteCreature = function(creature) {
            creatureService.deleteCreature(creature);
        };

        $scope.calculateInitiatives = function() {
            encounterService.calculateCreatureInitiatives($scope.selectedEncounter);
        };

        $scope.selectCreatureToUpdate = function(creature) {
            $scope.creatureToUpdate = angular.copy(creature);
            $scope.creatureToUpdate.oldName = angular.copy($scope.creatureToUpdate.name);
            $scope.isUpdateOpen = true;
        };

        $scope.selectEncounterToUpdate = function() {
            $scope.encounterToUpdate = angular.copy($scope.selectedEncounter);
            $scope.isUpdateEncounterOpen = true;
        };

        $scope.closeCreateEncounter = function() {
            $scope.newEncounter = {name: ''};
            $scope.isCreateEncounterOpen = false;
        };

        $scope.closeUpdateEncounter = function() {
            $scope.encounterToUpdate = {name: ''};
            $scope.isUpdateEncounterOpen = false;
        };

        $scope.closeUpdate = function() {
            $scope.creatureToUpdate = creatureFactory.createDefaultCreature();
            $scope.isUpdateOpen = false;
        };

        $scope.isSelected = function(creature) {
            return creature.name == $scope.creatureToUpdate.name;
        };

        $scope.resetCreatures = function() {
            creatureService.resetCreatures();
        };

        $scope.isCreatureNotValid = function(creature) {
            return !creatureService.isCreatureValid(creature);
        };

        $scope.toggleConsoleWindow = function(event) {
            $scope.isConsoleOpen = !$scope.isConsoleOpen;
            event.stopPropagation();
        };

        $scope.openCreateEncounterView = function() {
            $scope.isCreateEncounterOpen = true;
        };

        $scope.isAnEncounterSelected = function() {
            return typeof $scope.selectedEncounter != 'undefined' && $scope.selectedEncounter != null;
        };

        $scope.$watch('selectedEncounter', function(newVal, oldVal) {
            encounterService.setSelectedEncounter(newVal);
        });

        $scope.$watch(
            function() {
                return encounterService.getSelectedEncounter();
            },
            function() {
                $scope.seelctedEncounter = encounterService.getSelectedEncounter();
            }
        );

        function getEncounters() {
            encounterService.getEncounters().then(function(encounters) {
                $scope.encounters = encounters;
            })
        }
    }]);