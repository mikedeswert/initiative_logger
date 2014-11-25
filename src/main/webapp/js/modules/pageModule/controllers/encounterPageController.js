angular.module('pageModule')
    .controller('EncounterPageController', ['$scope', 'messageService', 'pageService', function($scope, messageService, pageService) {
        $scope.pageService = pageService;

        $scope.init = function() {
            messageService.clearMessages();
        };

    }]);