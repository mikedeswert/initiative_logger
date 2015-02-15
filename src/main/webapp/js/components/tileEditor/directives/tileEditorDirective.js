angular.module('tileEditor').directive('tileEditor', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/tileEditor.html')
    };
}]);