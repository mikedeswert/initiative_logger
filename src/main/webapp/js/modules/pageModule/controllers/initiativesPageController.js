angular.module('pageModule')
    .controller('InitiativesPageController', ['$scope', 'restService', 'messageService', 'pageService', 'webSocketService', 'creatureService', 'encounterService', function ($scope, restService, messageService, pageService, webSocketService, creatureService, encounterService) {
        $scope.pageService = pageService;

        $scope.init = function () {
            webSocketService.subscribe('InitiativesController', updateSelectedEncounter);
            messageService.clearMessages();
            updateSelectedEncounter();
        };

        $scope.getCreatureClass = function (index) {
            if (index == 0) {
                return 'bg-primary well-lg first';
            }

            return 'well-sm';
        };

        $scope.getInitiativeClass = function (index) {
            if (index == 0) {
                return 'label-warning';
            }

            return 'label-default';
        };

        $scope.nextTurn = function () {
            if(typeof $scope.orderedCreatures != 'undefined' || $scope.orderedCreatures.length > 0) {
                restService.post('/rest/creature/' + $scope.orderedCreatures[0].id + '/incrementTurnCount', null)
                    .then(
                    function () {
                        // Do nothing
                    },
                    function () {
                        messageService.addErrorMessage('Something went wrong while trying to increment the creature his turn count. Please try again. \n' +
                        'If the problem persists, contact the site administrator.')
                    }
                );
            }
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