angular.module('pageModule')
    .controller('MainController', ['$scope', 'pageService', function($scope, pageService) {
        $scope.pageService = pageService;
    }]);