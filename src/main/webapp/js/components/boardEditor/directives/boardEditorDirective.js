angular.module('boardEditor').directive('boardEditor', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/boardEditor.html')
    };
}]);