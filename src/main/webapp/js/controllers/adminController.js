angular.module('initiativeRollerModule')
    .controller('AdminController', ['$scope', 'messageService', 'pageService', function($scope, messageService, pageService) {
        $scope.pageService = pageService;

        $scope.init = function() {
            messageService.clearMessages();
        };

    }]);