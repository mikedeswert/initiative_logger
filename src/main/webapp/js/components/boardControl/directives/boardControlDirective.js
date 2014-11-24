angular.module('boardControl').directive('boardControl', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/boardControl.html')
    };
}]);