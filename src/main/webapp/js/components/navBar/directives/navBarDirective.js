angular.module('navBar').directive('navBar', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/navBar.html')
    };
}]);