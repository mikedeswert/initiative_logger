angular.module('creatureControl')
    .controller('CreatureController', ['$scope', 'creatureFactory', 'creatureService', 'webSocketService', 'encounterService', function($scope, creatureFactory, creatureService,webSocketService, encounterService) {
        $scope.creatures = [];
        $scope.newCreature = creatureFactory.createDefaultCreature();
        $scope.creatureToUpdate = creatureFactory.createDefaultCreature();
        $scope.isAddCreatureExpanded = true;
        $scope.isConsoleExpanded = true;
        $scope.isUpdateCreatureExpanded = true;
        $scope.isConsoleOpen = false;
        $scope.isUpdateOpen = false;

        $scope.init = function() {
            webSocketService.subscribe('CreatureController', function() {
                updateSelectedEncounter();
            });

            updateSelectedEncounter();
        };

        $scope.createCreature = function() {
            if(creatureService.isCreatureValid($scope.newCreature)) {
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

        $scope.closeUpdate = function() {
            $scope.creatureToUpdate = creatureFactory.createDefaultCreature();
            $scope.isUpdateOpen = false;
        };

        $scope.isSelected = function(creature) {
            return creature.name == $scope.creatureToUpdate.name;
        };

        $scope.resetCreatures = function() {
            encounterService.resetCreatures($scope.selectedEncounter);
        };

        $scope.isCreatureNotValid = function(creature) {
            return !creatureService.isCreatureValid(creature);
        };

        $scope.toggleConsoleWindow = function(event) {
            $scope.isConsoleOpen = !$scope.isConsoleOpen;
            event.stopPropagation();
        };

        $scope.isEncounterSelected = function() {
            return encounterService.isEncounterSelected();
        };

        $scope.$watch(
            function() {
                return encounterService.getSelectedEncounter();
            },
            updateSelectedEncounter
        );

        function updateSelectedEncounter() {
            $scope.selectedEncounter = encounterService.getSelectedEncounter();
        }
    }]);