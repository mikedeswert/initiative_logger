angular.module('initiativeRollerModule')
    .controller('MainController', ['$scope', 'pageService', function($scope, pageService) {
        $scope.pageService = pageService;
    }]);