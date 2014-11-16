angular.module('initiativeRollerModule')
    .controller('InitiativesController', ['$scope', 'restService', 'messageService', 'pageService', 'webSocketService', 'creatureService', function($scope, restService, messageService, pageService, webSocketService, creatureService) {
        $scope.creatures = [];
        $scope.pageService = pageService;

        $scope.init = function() {
            webSocketService.subscribe('InitiativesController', getCreatures);
            messageService.clearMessages();
            getCreatures();
        };

        $scope.getCreatureClass = function(index) {
            if(index == 0) {
                return 'bg-primary well-lg first';
            }

            return 'well-sm';
        };

        $scope.getInitiativeClass = function(index) {
            if(index == 0) {
                return 'label-warning';
            }

            return 'label-default';
        };

        $scope.nextTurn = function(index) {
            if(index == 0) {
                restService.post('/rest/creature/next', null)
                            .then(
                                function () {
                                    if($scope.creatures.length > 1) {
                                            var creature = angular.copy($scope.creatures[0]);
                                            $scope.creatures.splice(0, 1);
                                        $scope.creatures.push(creature);
                                    }
                                },
                                function () {
                                    messageService.addErrorMessage('Something went wrong while trying to go to the next turn. Please try again. \n' +
                                        'If the problem persists, contact the site administrator.')
                                }
                            );
            }
        };

        function getCreatures() {
            creatureService.getCreatures().then(function(creatures) {
                $scope.creatures = creatures;
            });
        }
    }]);