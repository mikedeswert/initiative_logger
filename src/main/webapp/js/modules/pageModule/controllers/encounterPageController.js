angular.module('pageModule')
    .controller('EncounterPageController', ['$scope', 'messageService', function($scope, messageService) {
        $scope.init = function() {
            messageService.clearMessages();
        };

    }]);