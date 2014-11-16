angular.module('initiativeRollerModule')
    .controller('AdminController', ['$scope', 'restService', 'messageService', 'pageService', 'creatureFactory', 'webSocketService', 'creatureService', function($scope, restService, messageService, pageService, creatureFactory, webSocketService, creatureService) {
        $scope.creatures = [];
        $scope.pageService = pageService;
        $scope.newCreature = creatureFactory.createDefaultCreature();;
        $scope.creatureToUpdate = creatureFactory.createDefaultCreature()
        $scope.isAddCreatureExpanded = true;
        $scope.isConsoleExpanded = true;
        $scope.isUpdateCreatureExpanded = true;
        $scope.isConsoleOpen = false;
        $scope.isUpdateOpen = false;

        $scope.init = function() {
            webSocketService.subscribe('AdminController', getCreatures);

            messageService.clearMessages();

            getCreatures();

            $scope.$broadcast('focusName');
        };

        $scope.createCreature = function() {
            if(creatureService.isCreatureValid($scope.newCreature)) {
                creatureService.createCreature($scope.newCreature).then(
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
                        $scope.creatureToUpdate = creatureFactory.createDefaultCreature();
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
            creatureService.calculateInitiatives();
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
            creatureService.resetCreatures();
        };


        $scope.isCreatureNotValid = function(creature) {
            return !creatureService.isCreatureValid(creature);
        };

        $scope.toggleConsoleWindow = function(event) {
            $scope.isConsoleOpen = !$scope.isConsoleOpen;
            event.stopPropagation();
        };

        function getCreatures() {
            creatureService.getCreatures().then(function(creatures) {
                $scope.creatures = creatures;
            });
        }
    }]);