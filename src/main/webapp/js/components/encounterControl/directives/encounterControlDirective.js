angular.module('encounterControl').directive('encounterControl', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/encounterControl.html')
    };
}]);