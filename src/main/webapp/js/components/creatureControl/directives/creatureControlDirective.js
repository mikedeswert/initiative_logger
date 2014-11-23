angular.module('creatureControl').directive('creatureControl', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/creatureControl.html')
    };
}]);