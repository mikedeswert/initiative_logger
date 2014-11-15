angular.module('initiativeRollerModule')
    .controller('InitiativesController', ['$scope', 'restService', 'messageService', 'pageService', 'webSocketFactory', function($scope, restService, messageService, pageService, webSocketFactory) {
        $scope.creatures = [];
        $scope.messageService = messageService;
        $scope.pageService = pageService;

        $scope.init = function() {
            webSocketFactory.createNotifyWebSocket(getCreatures);
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
            restService.get('/rest/creature/')
                .then(
                function(response) {
                    $scope.creatures = response.data;
                },
                function() {
                    messageService.addErrorMessage('Something went wrong while retrieving the creatures. Please refresh the page to try again.');
                }
            );
        }
    }]);