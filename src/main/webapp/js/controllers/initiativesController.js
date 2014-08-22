angular.module('initiativeRollerModule')
    .controller('InitiativesController', ['$scope', 'restService', 'messageService', function($scope, restService, messageService) {
        $scope.creatures = [];
        $scope.messageService = messageService;

        $scope.init = function() {
            messageService.clearMessages();
            restService.get('/rest/creature/calculate')
                       .then(
                           function(response) {
                               $scope.creatures = response.data;
                           },
                           function() {
                               messageService.addErrorMessage('Something went wrong while retrieving the calculated initiatives. Please refresh the page to try again.');
                           }
                       );
        };
    }]);